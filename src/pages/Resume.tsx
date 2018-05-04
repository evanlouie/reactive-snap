import React from "react";

export const Resume: React.StatelessComponent = () => (
  <div className="Resume">
    <article className="content resume">
      <section className="section">
        <h3 className="title">Profile</h3>

        <p className="body">
          Evan is an experienced software developer with 6+ years experience. Web developer through
          and through, Evan enjoys developing with bleeding edge technologies in his search for the
          perfect web stack. Evan is currently a open-source software engineer on Microsoft's
          Commercial Software Engineering team.
        </p>
      </section>

      <section className="skills">
        <h3 className="title">Skills</h3>
        <ul className="body">
          <li>
            <strong>Distributed:</strong> Kubernetes, Docker, Apache Spark, Apache ZooKeeper, MPI
          </li>
          <li>
            <strong>JavaScript/TypeScript:</strong> Node.js, Express.js, Koa.js, React, Redux,
            Vue.js, jQuery
          </li>
          <li>
            <strong>Clojure/ClojureScript:</strong> Lumo, Reagent
          </li>
          <li>
            <strong>Elixir/Erlang:</strong> Phoenix
          </li>
          <li>
            <strong>Go:</strong> Hugo
          </li>
          <li>
            <strong>Ruby:</strong> Rails, Sinatra
          </li>
          <li>
            <strong>PHP:</strong> Symfony, Wordpress, CraftCMS
          </li>
          <li>
            <strong>Java:</strong> GWT, Spring MVC
          </li>
          <li>
            <strong>C/C++:</strong> Boost, OpenGL
          </li>
          <li>
            <strong>Database/Key-Value Store:</strong> PostgreSQL, MySQL/MariaDB, MongoDB, Redis
          </li>
          <li>
            <strong>Web Development:</strong> Azure, Webpack, Babel, HTML5/CSS3, SASS, Google AMP,
            Progressive Web Apps
          </li>
        </ul>
      </section>

      <section className="experience">
        <h3 className="title">Experience</h3>

        <div className="body">
          <div className="job">
            <div className="placement">
              <span className="company">
                <a href="https://microsoft.com/">Microsoft Corporation</a>
              </span>
              <span className="duration">June 2017 - Present</span>
            </div>
            <div className="role">Software Development Engineer</div>
            <div className="description">
              Open Source Software Engineer & Microsoft Partner Engagement Specialist
            </div>
            <div className="technologies">
              TypeScript (Node.js, React, Redux), Kubernetes, Docker
            </div>
            <div className="responsibilities" />
          </div>
          <div className="job">
            <div className="placement">
              <span className="company">
                <a href="https://hootsuite.com/">Hootsuite Media, Inc.</a>
              </span>
              <span className="duration">June 2015 - June 2017</span>
            </div>
            <div className="role">Software Developer</div>
            <div className="description">Full-stack Developer of Hootsuite website</div>
            <div className="technologies">PHP (Symfony), TypeScript (Node.js, React, Redux)</div>
            <div className="responsibilities">
              <ul>
                <li>Developed/Designed component based page builder for Hootsuite editors.</li>
                <li>
                  Developed Darklaunch/Gatekeeper system for targeted demographic page rendering.
                </li>
                <li>Developer and maintainer of Hootsuite CMS.</li>
              </ul>
            </div>
          </div>
          <div className="job">
            <div className="placement">
              <span className="company">
                <a href="https://sap.com">SAP SE</a>
              </span>
              <span className="duration">Jan 2012 - Aug 2014</span>
            </div>
            <div className="role">Software Engineer</div>
            <div className="description">
              Full-stack developer and legal analyst of third-party open-source
            </div>
            <div className="technologies">
              Ruby (Rails), JavaScript (CoffeeScript, jQuery), Java (Spring)
            </div>
            <div className="responsibilities">
              <ul>
                <li>
                  Developed portal to automate scanning/tracking of open-source code usage and
                  license conflicts.
                </li>
                <li>Developed open-source vulnerability database and search engine.</li>
                <li>
                  Audited third party open-source licenses to assure compliance with SAP commercial
                  usage.
                </li>
              </ul>
            </div>
          </div>
          <div className="job">
            <div className="placement">
              <span className="company">
                <a href="http://oxfordfoods.net">Oxford Foods</a>
              </span>
              <span className="duration">May 2007 - Aug 2009</span>
            </div>
            <div className="role">Software Developer</div>
            <div className="description">
              Backend developer of BI/Inventory tools and system administrator
            </div>
            <div className="technologies">Java (Spring)</div>
            <div className="responsibilities">
              <ul>
                <li>
                  Developed backend inventory system which tracks stock inventory and purchasing
                  trends.
                </li>
                <li>Administrated Linux (CentOS) and Windows (Server 2008) servers.</li>
                <li>Managed network infrastructure.</li>
              </ul>
            </div>
          </div>
          <div className="job">
            <div className="placement">
              <span className="company">
                <a href="/">evanlouie.com</a>
              </span>
              <span className="duration">Aug 2009 - Present</span>
            </div>
            <div className="role">Software Developer - Hacker for Hire</div>
            <div className="description">Developer for contract based clientele</div>
            <div className="technologies">
              Elixir/Erlang (Phoenix), PHP (Wordpress, CraftCMS), Ruby (Rails), Javascript (Meteor)
            </div>
            <div className="responsibilities">
              <ul>
                <li>
                  Web developer for projects ranging from personal blogs to high-frequency trading
                  systems.
                </li>
                <li>SEO Optimization, Google AMP and Analytics deployment.</li>
                <li>Linux server/kernel customizations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="education">
        <div className="title">
          <h3>Education</h3>
        </div>

        <div className="body">
          <div className="entry">
            <div className="convocation">
              <span className="school">
                <a href="https://www.ubc.ca/">University of British Columbia</a>
              </span>
              <span className="conferred">April 2015</span>
            </div>
            <div className="degree">B.Sc Major in Computer Science</div>
          </div>
          <div className="entry">
            <div className="convocation">
              <span className="school">
                <a href="https://www.smus.ca/">St. Michaels University School</a>
              </span>
              <span className="conferred">May 2009</span>
            </div>
            <div className="degree">Dogwood Diploma</div>
          </div>
        </div>
      </section>
    </article>
  </div>
);

export default Resume;
