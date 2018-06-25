import React, { StatelessComponent } from "react";

interface IJob {
  company: string;
  website: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  title: string;
  technologies: string[];
  responsibilities: string[];
}

interface IEducation {
  school: string;
  website: string;
  conferralDate: Date;
  degree: string;
}

interface IResume {
  skills: ISkill[];
  experience: IJob[];
  education: IEducation[];
  profile: string;
}

interface ISkill {
  skill: string;
  tools: string[];
  icon: JSX.Element;
}

export const Resume: React.StatelessComponent<IResume> = (
  { profile, education, experience, skills } = {
    profile:
      "Evan is an experienced software developer with 7+ years experience. Web developer through and through, Evan enjoys developing with bleeding edge technologies in his search for the perfect web stack. Evan is currently a open-source software engineer on Microsoft's Commercial Software Engineering team.",
    experience: [
      {
        company: "Microsoft Corporation",
        website: "https://www.microsoft.com/",
        title: "Software Development Engineer",
        startDate: new Date("June 2017"),
        technologies: [
          "Kubernetes",
          "Docker",
          "Azure",
          "TypeScript",
          "React",
          "Go",
          "Containers",
          "Databricks/Spark",
        ],
        description:
          "Open Source Software Engineer, Azure Consultant, and Containerization Strategist",
        responsibilities: [
          "Develop solutions for original problems in the realm of containers and open-source.",
        ],
      },
      {
        company: "Hootsuite Media, Inc.",
        website: "https://hootsuite.com/",
        title: "Software Developer",
        startDate: new Date("June 2015"),
        endDate: new Date("June 2017"),
        description: "Full-stack Developer of Hootsuite website",
        technologies: ["PHP (Symfony)", "TypeScript (Node.js, React, Redux)"],
        responsibilities: [
          "Developed/Designed component based page builder for Hootsuite editors.",
          "Developed Darklaunch/Gatekeeper system for targeted demographic page rendering.",
          "Developer and maintainer of Hootsuite CMS.",
        ],
      },
      {
        company: "SAP SE",
        website: "https://www.sap.com/",
        startDate: new Date("January 2012"),
        endDate: new Date("August 2014"),
        title: "Software Engineer",
        description: "Full-stack developer and legal analyst of third-party open-source",
        technologies: ["Ruby (Rails)", "JavaScript (CoffeeScript, jQuery)", "Java (Spring)"],
        responsibilities: [
          "Developed portal to automate scanning/tracking of open-source code usage and license conflicts.",
          "Developed open-source vulnerability database and search engine.",
          "Audited third party open-source licenses to assure compliance with SAP commercial usage.",
        ],
      },
      {
        company: "Oxford Foods",
        website: "https://www.oxfordfoods.ca/",
        startDate: new Date("May 2007"),
        endDate: new Date("August 2009"),
        title: "Software Developer",
        description: "Backend developer of BI/Inventory tools and system administrator",
        technologies: ["Java (Spring)"],
        responsibilities: [
          "Developed backend inventory system which tracks stock inventory and purchasing trends.",
          "Administrated Linux (CentOS) and Windows (Server 2008) servers.",
          "Managed network infrastructure.",
        ],
      },
      {
        company: "evanlouie.com",
        website: "/",
        startDate: new Date("August 2009"),
        title: "Software Developer | Azure Consultant | Containerization Strategist",
        description:
          "Contractor specializing in distrubuted systems, containerization technologies, and Azure",
        technologies: [
          "Kubernetes",
          "Docker",
          "Azure",
          "TypeScript (React, Nest)",
          "PHP (Wordpress, CraftCMS)",
          "Ruby (Rails)",
        ],
        responsibilities: [
          "Web developer for projects ranging from personal blogs to high-frequency trading systems.",
          "SEO Optimization, Google AMP and Analytics deployment.",
          "Linux server/kernel customizations.",
        ],
      },
    ],
    education: [
      {
        school: "University of British Columbia",
        website: "https://www.ubc.ca/",
        conferralDate: new Date("April 2015"),
        degree: "B.Sc Major in Computer Science",
      },
      {
        school: "St. Michaels University School",
        website: "https://www.smus.ca/",
        conferralDate: new Date("May 2009"),
        degree: "Dogwood Diploma",
      },
    ],
    skills: [
      {
        skill: "Distributed",
        tools: ["Kubernetes", "Docker", "Databricks/Apache Spark", "Apache ZooKeeper", "MPI"],
        icon: (
          <svg id="docker" viewBox="0 0 128 128">
            <path
              d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.9-4.3 2.4-2.8 1-5.9 2-8.9 2H79V49H66V24H51v12H26v13H13v14H1.8l-.2 1.5c-.5 6.4.3 12.6 3 18.5l1.1 2.2.1.2c7.9 13.4 21.7 19 36.8 19 29.2 0 53.3-13.1 64.3-40.6 7.4.4 15-1.8 18.6-8.9l.9-1.8-1.6-1zM28 39h10v11H28V39zm13.1 44.2c0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-1.7 1.4-3.1 3.1-3.1 1.7.1 3.1 1.4 3.1 3.1zM28 52h10v11H28V52zm-13 0h11v11H15V52zm27.7 50.2c-15.8-.1-24.3-5.4-31.3-12.4 2.1.1 4.1.2 5.9.2 1.6 0 3.2 0 4.7-.1 3.9-.2 7.3-.7 10.1-1.5 2.3 5.3 6.5 10.2 14 13.8h-3.4zM51 63H40V52h11v11zm0-13H40V39h11v11zm13 13H53V52h11v11zm0-13H53V39h11v11zm0-13H53V26h11v11zm13 26H66V52h11v11zM38.8 81.2c-.2-.1-.5-.2-.8-.2-1.2 0-2.2 1-2.2 2.2 0 1.2 1 2.2 2.2 2.2s2.2-1 2.2-2.2c0-.3-.1-.6-.2-.8-.2.3-.4.5-.8.5-.5 0-.9-.4-.9-.9.1-.4.3-.7.5-.8z"
              fill="#019BC6"
            />
          </svg>
        ),
      },
      {
        skill: "TypeScript/JavaScript",
        tools: ["Node.js", "Nest", "TypeORM", "Koa.js", "React", "Redux", "Vue.js", "jQuery"],
        icon: (
          <svg id="typescript" viewBox="0 0 128 128">
            <rect x="22.67" y="47" width="99.67" height="73.67" fill="#fff" />
            <path
              fill="#007acc"
              d="M1.5,63.91v62.5h125V1.41H1.5Zm100.73-5a15.56,15.56,0,0,1,7.82,4.5,20.58,20.58,0,0,1,3,4c0,.16-5.4,3.81-8.69,5.85-.12.08-.6-.44-1.13-1.23a7.09,7.09,0,0,0-5.87-3.53c-3.79-.26-6.23,1.73-6.21,5a4.58,4.58,0,0,0,.54,2.34c.83,1.73,2.38,2.76,7.24,4.86,8.95,3.85,12.78,6.39,15.16,10,2.66,4,3.25,10.46,1.45,15.24-2,5.2-6.9,8.73-13.83,9.9a38.32,38.32,0,0,1-9.52-.1,23,23,0,0,1-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34,9.34,0,0,1,1.15-.73L82,101l3.59-2.08.75,1.11a16.78,16.78,0,0,0,4.74,4.54c4,2.1,9.46,1.81,12.16-.62a5.43,5.43,0,0,0,.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48,16.48,0,0,1-3.43-6.25,25,25,0,0,1-.22-8c1.33-6.23,6-10.58,12.82-11.87A31.66,31.66,0,0,1,102.23,58.93ZM72.89,64.15l0,5.12H56.66V115.5H45.15V69.26H28.88v-5A49.19,49.19,0,0,1,29,59.09C29.08,59,39,59,51,59L72.83,59Z"
            />
          </svg>
        ),
        // icon: (
        //   <svg id="javascript" viewBox="0 0 128 128">
        //     <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
        //     <path
        //       fill="#323330"
        //       d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
        //     />
        //   </svg>
        // ),
      },
      {
        skill: "Scala/Java",
        tools: ["Databricks/Apache Spark"],
        icon: (
          <svg id="java" viewBox="0 0 128 128">
            <path
              fill="#0074BD"
              d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
            />
            <path
              fill="#EA2D2E"
              d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
            />
            <path
              fill="#0074BD"
              d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
            />
            <path
              fill="#EA2D2E"
              d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
            />
            <path
              fill="#0074BD"
              d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
            />
          </svg>
        ),
      },
      {
        skill: "PHP",
        tools: ["Symfony", "Wordpress", "CraftCMS"],
        icon: (
          <svg id="php" viewBox="0 0 128 128">
            <path
              fill="#6181B6"
              d="M64 33.039C30.26 33.039 2.906 46.901 2.906 64S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039zM48.103 70.032c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34H41.7c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515a15.118 15.118 0 0 1-2.972 3.748zM69.414 73l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-33h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528L76.772 73h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.722-1.458 1.364-3.078 1.927-4.86 2.507-1.782.581-4.053.461-6.812.461h-6.253l-1.732 10h-7.301l6.514-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.39zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421.484-2.491.264-4.434-.66-5.458-.925-1.024-2.774-1.721-5.548-1.721zm-56.985 0h-5.002l-2.727 14h4.441c2.943 0 5.136-.29 6.577-1.4 1.441-1.108 2.413-2.828 2.917-5.421.484-2.491.264-4.434-.66-5.458S41.708 54 38.934 54z"
            />
          </svg>
        ),
      },
      {
        skill: "Ruby",
        tools: ["Rails", "Sinatra"],
        icon: (
          <svg id="ruby" viewBox="0 0 128 128">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#D91404"
              d="M35.971 111.33l81.958 11.188c-9.374-15.606-18.507-30.813-27.713-46.144L35.971 111.33zm89.71-86.383c-2.421 3.636-4.847 7.269-7.265 10.907a67619.72 67619.72 0 0 0-24.903 37.485c-.462.696-1.061 1.248-.41 2.321 8.016 13.237 15.969 26.513 23.942 39.777 1.258 2.095 2.53 4.182 4.157 6.192l4.834-96.58-.355-.102zM16.252 66.22c.375.355 1.311.562 1.747.347 7.689-3.779 15.427-7.474 22.948-11.564 2.453-1.333 4.339-3.723 6.452-5.661 6.997-6.417 13.983-12.847 20.966-19.278.427-.395.933-.777 1.188-1.275 2.508-4.902 4.973-9.829 7.525-14.898-3.043-1.144-5.928-2.263-8.849-3.281-.396-.138-1.02.136-1.449.375-6.761 3.777-13.649 7.353-20.195 11.472-3.275 2.061-5.943 5.098-8.843 7.743-4.674 4.266-9.342 8.542-13.948 12.882a24.011 24.011 0 0 0-3.288 3.854c-3.15 4.587-6.206 9.24-9.402 14.025 1.786 1.847 3.41 3.613 5.148 5.259zm28.102-6.271l-11.556 48.823 54.3-34.987-42.744-13.836zm76.631-34.846l-46.15 7.71 15.662 38.096c10.221-15.359 20.24-30.41 30.488-45.806zM44.996 56.644l41.892 13.6c-5.25-12.79-10.32-25.133-15.495-37.737L44.996 56.644zM16.831 75.643L2.169 110.691l27.925-.825-13.263-34.223zm13.593 26.096l.346-.076c3.353-13.941 6.754-27.786 10.177-42.272L18.544 71.035c3.819 9.926 7.891 20.397 11.88 30.704zm84.927-78.897c-4.459-1.181-8.918-2.366-13.379-3.539-6.412-1.686-12.829-3.351-19.237-5.052-.801-.213-1.38-.352-1.851.613-2.265 4.64-4.6 9.245-6.901 13.868-.071.143-.056.328-.111.687l41.47-6.285.009-.292zM89.482 12.288l36.343 10.054-6.005-17.11-30.285 6.715-.053.341zM33.505 114.007c-4.501-.519-9.122-.042-13.687.037-3.75.063-7.5.206-11.25.323-.386.012-.771.09-1.156.506 31.003 2.866 62.005 5.732 93.007 8.6l.063-.414-29.815-4.07c-12.384-1.691-24.747-3.551-37.162-4.982zM2.782 99.994c3.995-9.27 7.973-18.546 11.984-27.809.401-.929.37-1.56-.415-2.308-1.678-1.597-3.237-3.318-5.071-5.226-2.479 12.24-4.897 24.177-7.317 36.113l.271.127c.185-.297.411-.578.548-.897zm78.74-90.153c6.737-1.738 13.572-3.097 20.367-4.613.44-.099.87-.244 1.303-.368l-.067-.332-29.194 3.928c2.741 1.197 4.853 2.091 7.591 1.385z"
            />
          </svg>
        ),
      },
      {
        skill: "Go",
        tools: ["Hugo"],
        icon: (
          <svg id="go" viewBox="0 0 128 128">
            <defs>
              <path id="a" d="M18.8 1h90.5v126H18.8z" />
            </defs>
            <clipPath id="b">
              <use xlinkHref="#a" overflow="visible" />
            </clipPath>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#F6D2A2"
              d="M21.1 68.7c.2 3.5 3.7 1.9 5.3.8 1.5-1.1 2-.2 2.1-2.3.1-1.4.2-2.7.2-4.1-2.3-.2-4.8.3-6.7 1.7-.9.7-2.8 3-.9 3.9"
              clipPath="url(#b)"
            />
            <path
              d="M23 71.2c-.7 0-2-.3-2.2-2.3-.6-.4-.8-.9-.8-1.2-.1-1.2 1.2-2.6 1.9-3.1 1.6-1.2 3.7-1.8 5.9-1.8h1.3v.3c.1 1.1 0 2.2-.1 3.2 0 .3 0 .6-.1.9-.1 1.5-.4 1.7-1.1 2-.3.1-.6.2-1.1.6-.5.3-2.2 1.4-3.7 1.4zm4.8-7.8c-2.1 0-4 .6-5.5 1.7-.7.5-1.7 1.7-1.6 2.5 0 .3.2.6.6.8l.2.1v.2c.1 1.6.9 1.8 1.5 1.8 1 0 2.4-.7 3.3-1.3.6-.4 1-.5 1.3-.6.5-.2.6-.2.7-1.4 0-.3 0-.6.1-.9.1-.9.1-1.9.1-2.8-.3-.1-.5-.1-.7-.1z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#C6B198"
              d="M21.1 68.7c.5-.2 1.1-.3 1.4-.8"
              clipPath="url(#b)"
            />
            <path
              d="M21.1 69c-.1 0-.3-.1-.3-.2-.1-.2 0-.4.2-.4.1 0 .2-.1.2-.1.4-.2.8-.3 1-.6.1-.1.3-.2.5-.1.1.1.2.3.1.5-.4.5-.9.7-1.3.8l-.2.1h-.2z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#6AD7E5"
              d="M29.3 26.4c-13.6-3.8-3.5-21.1 7.4-14l-7.4 14z"
              clipPath="url(#b)"
            />
            <path
              d="M29.5 26.8l-.3-.1c-7-2-6.9-7-6.7-8.5.5-3.8 4.1-7.8 8.9-7.8 1.9 0 3.7.6 5.5 1.8l.3.2-7.7 14.4zm1.9-15.7c-4.5 0-7.8 3.7-8.3 7.2-.5 3.6 1.7 6.4 6 7.7l7.1-13.5c-1.5-.9-3.1-1.4-4.8-1.4z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#6AD7E5"
              d="M89.6 11.1c10.7-7.5 20.5 9.5 8 13.8l-8-13.8z"
              clipPath="url(#b)"
            />
            <path
              d="M97.5 25.3L89.2 11l.3-.2c1.9-1.3 3.8-2 5.7-2 4.6 0 7.9 3.8 8.6 7.5.3 1.5.6 6.6-6 8.8l-.3.2zm-7.4-14l7.7 13.3c3.9-1.4 5.9-4.4 5.3-8-.6-3.4-3.7-6.9-7.9-6.9-1.7-.1-3.4.4-5.1 1.6z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#F6D2A2"
              d="M92 112.3c2.7 1.7 7.7 6.8 3.6 9.3-3.9 3.6-6.1-4-9.6-5 1.5-2 3.4-3.9 6-4.3"
              clipPath="url(#b)"
            />
            <path
              d="M93.5 122.9c-1.6 0-3-1.6-4.2-3.1-1.1-1.2-2.2-2.5-3.4-2.9l-.5-.1.3-.4c1.2-1.7 3.2-3.9 6.2-4.4h.1l.1.1c1.7 1.1 5.4 4.2 5.3 7.1 0 1.1-.6 2-1.7 2.7-.7.7-1.4 1-2.2 1zm-7-6.5c1.2.5 2.2 1.8 3.2 2.9 1.2 1.5 2.4 2.8 3.7 2.8.6 0 1.2-.3 1.8-.9h.1c.9-.6 1.4-1.3 1.4-2.2 0-2.3-2.9-5.2-4.9-6.5-1.8.5-3.6 1.7-5.3 3.9zm9.1 5.5c-.1 0-.2-.1-.3-.2-.2-.4-.4-.9-.5-1.3-.3-.8-.6-1.6-1.2-2.2-.1-.1-.1-.3 0-.5.1-.1.3-.1.5 0 .7.7 1.1 1.6 1.4 2.5l.5 1.2c.1.2 0 .4-.1.5h-.3z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#F6D2A2"
              d="M43.2 118.1c-3.2.5-5 3.4-7.7 4.9-2.5 1.5-3.5-.5-3.7-.9-.4-.2-.4.2-1-.4-2.3-3.7 2.4-6.4 4.9-8.2 3.5-.8 5.7 2.2 7.5 4.6"
              clipPath="url(#b)"
            />
            <path
              d="M33.8 123.8c-1.3 0-2-1.1-2.2-1.5h-.1c-.3 0-.5-.1-.9-.5v-.1c-2.2-3.5 1.6-6.2 4.1-8l.9-.6h.2c.4-.1.7-.1 1.1-.1 3 0 4.9 2.6 6.5 4.7l.5.7-.6.1c-1.9.3-3.3 1.5-4.7 2.7-.9.8-1.8 1.5-2.8 2.1-.8.3-1.4.5-2 .5zm-2.2-2.1c.1 0 .2 0 .4.1h.1l.1.1c.2.3.7 1.2 1.7 1.2.5 0 1-.2 1.5-.5 1-.5 1.9-1.3 2.7-2 1.3-1.1 2.7-2.3 4.5-2.8-1.5-2-3.3-4.2-5.8-4.2-.3 0-.6 0-.9.1l-.8.6c-2.6 1.8-5.8 4.1-3.9 7.1.1.2.2.3.4.3zm.2.7c-.2 0-.4-.2-.3-.4.1-1 .6-1.7 1.1-2.5.3-.4.5-.8.7-1.2.1-.2.3-.2.4-.2.2.1.2.3.2.4-.2.5-.5.9-.8 1.3-.5.7-.9 1.3-1 2.1 0 .4-.1.5-.3.5z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.9 21.7c-1.8-.9-3.1-2.2-2-4.3 1-1.9 2.9-1.7 4.7-.8l-2.7 5.1zm64.9-1.8c1.8-.9 3.1-2.2 2-4.3-1-1.9-2.9-1.7-4.7-.8l2.7 5.1z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#F6D2A2"
              d="M107.1 68.2c-.2 3.5-3.7 1.9-5.3.8-1.5-1.1-2-.2-2.1-2.3-.1-1.4-.2-2.7-.2-4.1 2.3-.2 4.8.3 6.7 1.7 1 .8 2.8 3 .9 3.9"
              clipPath="url(#b)"
            />
            <path
              d="M105.3 70.7c-1.5 0-3.2-1.1-3.7-1.4-.5-.3-.8-.5-1.1-.6-.8-.3-1-.5-1.1-2 0-.3 0-.6-.1-.9-.1-1-.2-2.1-.1-3.2v-.3h1.3c2.2 0 4.3.6 5.9 1.8.7.5 2 1.9 1.9 3.1 0 .4-.2.9-.8 1.2-.2 2-1.5 2.3-2.2 2.3zM99.8 63c0 .9 0 1.9.1 2.8 0 .3 0 .6.1.9.1 1.2.2 1.2.7 1.4.3.1.7.3 1.3.6.9.6 2.3 1.3 3.3 1.3.6 0 1.4-.2 1.5-1.8V68l.2-.1c.4-.2.6-.4.6-.8.1-.8-.9-2-1.6-2.5-1.5-1.1-3.5-1.7-5.5-1.7-.2.1-.4.1-.7.1z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#C6B198"
              d="M107.1 68.2c-.5-.2-1.1-.3-1.4-.8"
              clipPath="url(#b)"
            />
            <path
              d="M107.1 68.6h-.1l-.2-.1c-.5-.2-1-.3-1.3-.8-.1-.1-.1-.4.1-.5.1-.1.4-.1.5.1.2.3.6.4 1 .6.1 0 .2.1.2.1.2.1.3.3.2.4-.1.1-.3.2-.4.2z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#6AD7E5"
              d="M62.8 4c13.6 0 26.3 1.9 33 15 6 14.6 3.8 30.4 4.8 45.9.8 13.3 2.5 28.6-3.6 40.9-6.5 12.9-22.7 16.2-36 15.7-10.5-.4-23.1-3.8-29.1-13.4-6.9-11.2-3.7-27.9-3.2-40.4.6-14.8-4-29.7.9-44.1C34.5 8.5 48.1 5.1 62.8 4"
              clipPath="url(#b)"
            />
            <path
              d="M63.3 121.9h-2.5c-4.1-.1-10.3-.8-16.4-3.3-5.9-2.4-10.2-5.8-13-10.3-5.6-9.1-4.6-21.6-3.7-32.7.2-2.8.4-5.4.5-7.9.2-5.2-.2-10.6-.7-15.7-.8-9.4-1.6-19.1 1.5-28.5 2.4-7 6.7-12 13.2-15.2 5.1-2.5 11.4-3.9 20.4-4.6C76 3.6 89.3 5.5 96 18.8c4.4 10.7 4.4 22.2 4.5 33.3 0 4.2 0 8.5.3 12.7.1 1.3.2 2.6.2 3.9.8 12.2 1.7 26-3.9 37.2-2.8 5.7-7.7 9.9-14.4 12.6-5.4 2.2-12.2 3.4-19.4 3.4zM62.8 4.3c-14.1 1.1-27.9 4.2-33 19.4-3.1 9.3-2.3 18.9-1.5 28.2.4 5.2.9 10.5.7 15.8-.1 2.5-.3 5.1-.5 7.9-.9 11-1.9 23.4 3.6 32.3 2.3 3.7 9.7 12.5 28.8 13.2h2.5c22.1 0 30.3-9.8 33.3-15.6 5.5-11 4.6-24.8 3.9-36.9-.1-1.3-.2-2.6-.2-3.9-.2-4.2-.3-8.5-.3-12.7-.1-11-.1-22.5-4.4-33.1C92.7 13 88.2 9 82 6.7c-6.4-2.1-13.6-2.4-19.2-2.4z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
              d="M65.2 22.2c2.4 14.2 25.6 10.4 22.3-3.9-3-12.8-23.1-9.2-22.3 3.9"
              clipPath="url(#b)"
            />
            <path
              d="M76.2 31.5c-4.5 0-10.2-2.4-11.4-9.2-.2-3.2.8-6.1 2.9-8.3 2.3-2.5 5.8-3.9 9.4-3.9 4.2 0 9.2 2.2 10.6 8.3.8 3.4.2 6.4-1.7 8.8-2.1 2.6-5.8 4.3-9.8 4.3zm-10.7-9.3c.5 2.8 1.8 5 3.9 6.6 1.8 1.4 4.3 2.1 6.8 2.1 3.7 0 7.3-1.6 9.3-4.1 1.8-2.2 2.3-5.1 1.6-8.3-1.3-5.7-6-7.7-10-7.7-3.4 0-6.7 1.4-8.9 3.7-1.9 2-2.9 4.7-2.7 7.7z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
              d="M37.5 24.5c3.2 12.3 22.9 9.2 22.2-3.2-.9-14.8-25.3-12-22.2 3.2"
              clipPath="url(#b)"
            />
            <path
              d="M48 32.7c-4.3 0-9.3-2.1-10.9-8.1-.7-3.5 0-6.7 2-9.1 2.2-2.7 5.8-4.3 9.7-4.3 5.2 0 10.7 3.1 11.1 10.1.2 2.9-.7 5.5-2.7 7.6-2.1 2.3-5.6 3.8-9.2 3.8zm.8-20.8c-3.7 0-7.1 1.5-9.2 4-1.9 2.3-2.5 5.2-1.8 8.5C39.2 30 44 32 48 32c3.4 0 6.7-1.3 8.8-3.6 1.8-1.9 2.7-4.4 2.5-7.1-.2-4.3-3.1-9.4-10.5-9.4z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
              d="M68 39.2c0 1.8.4 3.9.1 5.9-.5.9-1.4 1-2.2 1.3-1.1-.2-2-.9-2.5-1.9-.3-2.2.1-4.4.2-6.6l4.4 1.3z"
              clipPath="url(#b)"
            />
            <path
              d="M65.9 46.8c-1.3-.2-2.3-1-2.8-2.1-.2-1.6-.1-3.1 0-4.6.1-.7.1-1.4.1-2.1v-.4l5.1 1.6v.2c0 .6.1 1.2.1 1.9.1 1.3.2 2.7 0 4v.1c-.4.8-1.1 1-1.8 1.3-.2-.1-.4 0-.7.1zm-2.2-2.4c.4.9 1.2 1.5 2.1 1.7.2-.1.4-.1.5-.2.6-.2 1.1-.4 1.4-.9.2-1.2.1-2.5 0-3.8 0-.6-.1-1.2-.1-1.7l-3.8-1.2c0 .6-.1 1.2-.1 1.7-.1 1.6-.2 3 0 4.4z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46.3 22.5c0 2-1.5 3.6-3.3 3.6-1.8 0-3.3-1.6-3.3-3.6s1.5-3.6 3.3-3.6c1.8 0 3.3 1.6 3.3 3.6"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
              d="M45.2 23.3c0 .5-.4.9-.8.9s-.8-.4-.8-.9.4-.9.8-.9c.5 0 .8.4.8.9"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M74.2 21.6c0 2-1.5 3.6-3.3 3.6-1.8 0-3.3-1.6-3.3-3.6s1.5-3.6 3.3-3.6c1.8 0 3.3 1.6 3.3 3.6"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
              d="M73.2 22.4c0 .5-.3.9-.8.9-.4 0-.8-.4-.8-.9s.3-.9.8-.9c.4 0 .8.4.8.9M58.4 39c-1.5 3.5.8 10.6 4.8 5.4-.3-2.2.1-4.4.2-6.6l-5 1.2z"
              clipPath="url(#b)"
            />
            <path
              d="M60.5 46.6c-.7 0-1.4-.4-1.9-1.2-1.1-1.6-1.3-4.6-.5-6.5l.1-.2 5.5-1.4v.4l-.1 2.2c-.1 1.5-.2 2.9 0 4.4v.1l-.1.1c-1 1.4-2 2.1-3 2.1zm-1.8-7.3c-.6 1.7-.4 4.4.5 5.7.4.6.8.9 1.3.9.7 0 1.5-.6 2.3-1.6-.2-1.5-.1-3 .1-4.4l.1-1.7-4.3 1.1z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#F6D2A2"
              d="M58.9 32.2c-2.7.2-4.9 3.5-3.5 6 1.9 3.4 6-.3 8.6 0 3 .1 5.4 3.2 7.8.6 2.7-2.9-1.2-5.7-4.1-7l-8.8.4z"
              clipPath="url(#b)"
            />
            <path
              fill="#231F20"
              d="M69.7 40.2c-.9 0-1.8-.4-2.7-.8-.9-.4-1.9-.8-3-.8h-.3c-.8 0-1.7.3-2.7.7-1.1.4-2.2.7-3.2.7-1.2 0-2.1-.5-2.7-1.6-.7-1.2-.6-2.6.1-3.9.8-1.5 2.2-2.4 3.7-2.6l8.9-.4h.1c2.2.9 4.7 2.6 5.2 4.6.2 1-.1 2-.9 2.9-.8.9-1.6 1.2-2.5 1.2zM64.1 38c1.1 0 2.2.5 3.2.9.9.4 1.7.7 2.5.7.7 0 1.3-.3 1.9-.9.7-.7.9-1.5.8-2.3-.4-1.7-2.8-3.3-4.7-4.1l-8.7.4c-1.3.1-2.5 1-3.2 2.2-.6 1.1-.6 2.3-.1 3.3.5.9 1.1 1.3 2.1 1.3.9 0 1.9-.4 2.9-.7 1.1-.4 2-.7 3-.7 0-.2.1-.2.3-.1z"
              clipPath="url(#b)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M58.6 32.1c-.2-4.7 8.8-5.3 9.8-1.4 1.1 4-9.4 4.9-9.8 1.4"
              clipPath="url(#b)"
            />
          </svg>
        ),
      },
      // {
      //   skill: "C/C++",
      //   tools: ["Boost", "OpenGL"],
      //   icon: (
      //     <svg id="c" viewBox="0 0 128 128">
      //       <path
      //         fill="#03599C"
      //         d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6zM64 88.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5z"
      //       />
      //     </svg>
      //   ),
      // },
      {
        skill: "Database/KV Store",
        tools: ["Azure Cosmos DB", "PostgreSQL", "MySQL/MariaDB", "MongoDB", "SQLite", "Redis"],
        icon: (
          <svg id="redis" viewBox="0 0 128 128">
            <path
              d="M6.2 52.7c6.7 3.2 43.7 18.1 49.5 20.9 5.8 2.8 10 2.8 17.4-1 7.4-3.9 42.2-18.1 48.9-21.6 3.4-1.8 4.9-3.2 4.9-4.4V34.1c0-1.3-1.7-2.4-5-3.6-6.5-2.4-41.1-16.1-47.7-18.6-6.6-2.4-9.3-2.3-17.1.5C49.3 15.2 12.6 29.6 6 32.2c-3.2 1.3-5 2.4-5 3.7H.8v12.7c.2 1.2 2.1 2.5 5.4 4.1zm60.4 1.8l-20.3-8.4 29.1-4.5-8.8 12.9zm44.1-20l-17.2 6.8-1.9.7-17.2-6.8 19.1-7.5 17.2 6.8zM60.1 22l-2.8-5.2 8.8 3.4 8.3-2.7-2.2 5.4 8.4 3.2-10.9 1.1-2.4 5.9-3.9-6.5-12.6-1.1 9.3-3.5zm-21.7 7.3c8.6 0 15.6 2.7 15.6 6s-7 6-15.6 6-15.6-2.7-15.6-6 7-6 15.6-6zM122 59.8c-6.7 3.5-41.4 17.8-48.8 21.6-7.4 3.9-11.5 3.8-17.3 1-5.8-2.8-43-17.7-49.6-20.9C2.9 59.9 1 58.6 1 57.3V70c0 1.3 1.9 2.6 5.2 4.2 6.7 3.2 43.7 18.1 49.5 20.9 5.8 2.8 10 2.8 17.4-1 7.4-3.9 42.2-18.1 48.9-21.6 3.4-1.8 4.9-3.2 4.9-4.4V55.6c0 1.1-1.6 2.5-4.9 4.2zm0 20.7c-6.7 3.5-41.4 17.8-48.8 21.6-7.4 3.9-11.5 3.8-17.3 1-5.8-2.8-43-17.7-49.6-20.9C2.9 80.7 1 79.3 1 78v12.7c0 1.3 1.9 2.6 5.2 4.2 6.7 3.2 43.7 18.1 49.5 20.9 5.8 2.8 10 2.8 17.4-1 7.4-3.9 42.2-18.1 48.9-21.6 3.4-1.8 4.9-3.2 4.9-4.4V76.3c0 1.2-1.6 2.5-4.9 4.2z"
              fill="#D82C20"
            />
          </svg>
        ),
      },
      {
        skill: "Web Development",
        tools: [
          "Azure",
          "Webpack",
          "Babel",
          "HTML5/CSS3",
          "SASS",
          "Google AMP",
          "Progressive Web Apps",
        ],
        icon: (
          <svg id="html5" viewBox="0 0 128 128">
            <path
              fill="#E44D26"
              d="M9.032 2l10.005 112.093 44.896 12.401 45.02-12.387L118.968 2H9.032zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471-3.233 36.119-.238 2.27L64 102.609v.002l-.034.018-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939l-.33 3.539z"
            />
          </svg>
        ),
      },
    ],
  },
) => {
  const monthMap: { [month: number]: string } = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const InlineIcon: StatelessComponent = ({ children }) => (
    <span
      className="InlineIcon"
      style={{
        display: "inline-block",
        width: "1em",
        height: "1em",
        margin: "auto 0.5em",
        verticalAlign: "middle",
      }}
    >
      {children}
    </span>
  );

  const Section: StatelessComponent<{ heading: string; className: string }> = ({
    children,
    className,
    heading,
  }) => (
    <section
      className={`Section ${className}`}
      style={{ borderTop: "1px solid #eee", marginTop: "1em" }}
    >
      <h3 className="title">{heading}</h3>
      {children}
    </section>
  );

  const DotlessUl: StatelessComponent = ({ children }) => (
    <ul className="DotlessUl" style={{ listStyle: "none", paddingLeft: "0.25em", margin: "0" }}>
      {children}
    </ul>
  );

  const Skill: StatelessComponent<ISkill> = ({ skill, tools, icon }) => (
    <li key={skill}>
      <InlineIcon>{icon}</InlineIcon>
      <strong>{skill}: </strong>
      {tools.map((tool, index) => `${tool}${index !== tools.length - 1 ? ", " : ""}`)}
    </li>
  );

  const Job: StatelessComponent<IJob> = ({
    company,
    title,
    description,
    website,
    startDate,
    endDate,
    responsibilities,
    technologies,
  }) => (
    <div
      key={company + title}
      className="job"
      style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", marginTop: "1em" }}
    >
      <div
        className="placement"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <span className="company">
          <a href={website}>{company}</a>
        </span>
        <span className="duration">
          {`${monthMap[startDate.getMonth() + 1]} ${startDate.getFullYear()} - `}
          {endDate ? `${monthMap[endDate.getMonth() + 1]} ${endDate.getFullYear()}` : "Present"}
        </span>
      </div>
      <div className="role">
        <em>{title}</em>
      </div>
      <div className="description">
        <strong>{description}</strong>
      </div>
      <div className="technologies">
        <InlineIcon>
          <svg viewBox="0 0 1792 1792">
            <path d="M553 1399l-50 50q-10 10-23 10t-23-10L-9 983q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23L160 960l393 393q10 10 10 23t-10 23zm591-1067L771 1623q-4 13-15.5 19.5T732 1645l-62-17q-13-4-19.5-15.5T648 1588l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z" />
          </svg>
        </InlineIcon>
        <code>
          {technologies.map(
            (tech, index) => `${tech}${index !== technologies.length - 1 ? ", " : ""}`,
          )}
        </code>
      </div>
      <div className="responsibilities">
        <DotlessUl>
          {responsibilities.map(responsibility => (
            <li key={responsibility}>
              <InlineIcon>
                <svg viewBox="0 0 1792 1792">
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45L531 45q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                </svg>
              </InlineIcon>
              {responsibility}
            </li>
          ))}
        </DotlessUl>
      </div>
    </div>
  );

  const Education: StatelessComponent<IEducation> = ({
    school,
    degree,
    website,
    conferralDate,
  }) => (
    <div
      key={school + degree}
      className="education"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className="convocation"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <span className="school">
          <a href={website}>{school}</a>
        </span>
        <span className="conferred">{`${
          monthMap[conferralDate.getMonth()]
        } ${conferralDate.getFullYear()}`}</span>
      </div>
      <div className="degree">
        <InlineIcon>
          <svg viewBox="0 0 1792 1792">
            <path d="M1518 836l18 316q4 69-82 128t-235 93.5-323 34.5-323-34.5-235-93.5-82-128l18-316 574 181q22 7 48 7t48-7zm530-324q0 23-22 31L906 895q-4 1-10 1t-10-1L234 689q-43 34-71 111.5T129 979q63 36 63 109 0 69-58 107l58 433q2 14-8 25-9 11-24 11H-32q-15 0-24-11-10-11-8-25l58-433q-58-38-58-107 0-73 65-111 11-207 98-330l-333-104q-22-8-22-31t22-31L886 129q4-1 10-1t10 1l1120 352q22 8 22 31z" />
          </svg>
        </InlineIcon>
        {degree}
      </div>
    </div>
  );

  return (
    <div className="Resume">
      <article className="content resume">
        <Section className="profile" heading="Profile">
          <p className="body">{profile}</p>
        </Section>
        <Section className="skills" heading="Skills">
          <DotlessUl>{skills.map(Skill)}</DotlessUl>
        </Section>
        <Section className="experience" heading="Experience">
          {experience.map(Job)}
        </Section>
        <Section className="education" heading="Education">
          {education.map(Education)}
        </Section>
      </article>
    </div>
  );
};

export default Resume;
