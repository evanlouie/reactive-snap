/**
 * @author Evan Louie <evan.louie@microsoft.com> (https://evanlouie.com)
 * @description A thin WebWorker class to make dispatching jobs easier
 */

type Atomic = number | string | boolean | null;
type Serializable = Atomic | Atomic[] | { [key: string]: Serializable };
type Lambda<T extends Serializable, P extends Serializable> = (...args: P[]) => T;
type WorkerJob = [string, string];

class WebWorker {
  /**
   * Schedules a lambda function to execute in a WebWorker and returns a Promise for the first message posted from the worker
   * Worker is terminated after first message or error
   * Runs a maximum of `one less than the number of cores || 1` Workers at any time; to not starve rendering thread
   *
   * @param lambda anonymous lambda function to execute; NOT a closure
   * @param parameters arguments to pass to lambda; only basic accepted; no undefined
   */
  public static async schedule<T extends Serializable, P extends Serializable>(
    lambda: Lambda<T, P>,
    parameters: P[] = [],
  ): Promise<T> {
    if ((navigator.hardwareConcurrency - 1 || 1) > this.workers.length) {
      const promise = this.thread(lambda, parameters).then((resolved) => {
        // Remove self from worker list
        this.workers.splice(this.workers.indexOf(promise), 1);
        return resolved;
      });
      this.workers.push(promise);
      return promise;
    } else {
      await Promise.race(this.workers);
      return this.schedule(lambda, parameters);
    }
  }

  private static workers: Array<Promise<any>> = [];

  /**
   * Execute a lambda function in a WebWorker and return a promise for the first posted message
   * The WebWorker terminates after the first message or error
   *
   * @param lambda anonymous lambda function to execute; NOT a closure
   * @param parameters arguments to pass to lambda; only basic accepted; no undefined
   */
  private static async thread<T extends Serializable, P extends Serializable>(
    lambda: Lambda<T, P>,
    parameters: P[] = [],
  ): Promise<T> {
    // Check to see if browser supports WebWorkers
    if (typeof Worker === "undefined") {
      console.exception(`${navigator.appVersion} lacks Web Worker support.`);
      console.info(
        "Web Workers are required to evaluated answers as computation will cause the main window thread to lock",
      );
      return Promise.reject(new Error("Your browser doesn't seem to support Web Workers :-("));
    }

    // Prep a string of JS to simulate a JS file the worker to execute
    const JSFile = `(${this.workerDecorator.toString()})(self)`;

    // Wrap in a Blob and it a URL within the window
    const runnable = new Blob([JSFile], { type: "text/javascript" }); // Make a runnable JS blob
    const url = window.URL.createObjectURL(runnable);

    // Run the worker
    const worker = new Worker(url);
    return new Promise<T>((resolve, reject) => {
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = (e) => {
        reject(e.message);
        worker.terminate();
      };

      worker.postMessage(this.serializeJob(lambda, parameters));
    });
  }

  /**
   * Serialize a Job to message passable payload
   *
   * @param job to convert to message passable format
   */
  private static serializeJob = <T extends Serializable, P extends Serializable>(
    lambda: Lambda<T, P>,
    params: P[],
  ): WorkerJob => {
    return [lambda.toString(), JSON.stringify(params)];
  };

  /**
   * Function to call inside the context of a Worker enabling it execute functions posted to it
   *
   * @example URL.createObjectURL(new Blob([`(${createWorkerScript.toString()})(self)`], { type: "text/javascript" }));
   * @param self `self` variable in the context of Worker
   * @param lambda callable to apply upon receiving a message
   */
  private static workerDecorator = <T extends Serializable, P extends Serializable>(
    self: Worker,
  ): Worker => {
    self.onmessage = (e) => {
      const data: WorkerJob = e.data;
      const [lambdaString, paramsJSON] = data;
      /**
       * Wrap in one set of parenthesis incase lambda is a nameless function() {}
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unnamed_function_statement
       */
      // tslint:disable-next-line
      const lambda = eval(`(${lambdaString})`) as Lambda<T, P>;
      const params = JSON.parse(paramsJSON) as P[];
      const response = lambda.apply(null, params);
      self.postMessage(response);
    };

    return self;
  };
}

(async () => {
  const start = Date.now();
  const answers = await Promise.all(
    [...Array(1000)].map(() =>
      WebWorker.schedule(() => {
        const answer = () => {
          x: for (let x = 1; x < Infinity; x++) {
            for (let divisor = 20; divisor > 1; divisor--) {
              if (x % divisor !== 0) {
                continue x;
              }
            }
            return x;
          }
          throw new Error("Failed to find an answer");
        };
        return answer();
      }).then((resolved) => {
        console.log(`Finished in ${Date.now() - start}ms`);
        return resolved;
      }),
    ),
  );
  console.log(`All jobs finished in: ${Date.now() - start}ms`);
  console.log(answers);
  return answers;
})();
