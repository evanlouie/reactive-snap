import React, { StatelessComponent } from "react";
import { C, Go, Java, Kubernetes, PHP, Redis, Ruby, Typescript, Webpack } from "../server/Icons";

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
  Icon: StatelessComponent;
}

const resume: IResume = {
  profile:
    "Evan is an experienced software developer with " +
    (new Date().getFullYear() - new Date("2009").getFullYear()) +
    "+ years experience. Opinionated, artistic, and enjoying a challenge; Evan loves reducing difficult problems to simplistic and beautiful solutions. Evan is currently a open-source software engineer on Microsoft's Commercial Software Engineering team working on all things Kubernetes, Docker, and Azure.",
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
        "Develop ML pipeline solutions on Kubernetes which can elastically scale training amongst thousands of nodes.",
        "Develop data pipeline solutions with Spark to collate data from globally distributed IoT devices.",
        "Develop and maintain Microsoft open source projects.",
        "Architect and develop custom solutions with Microsoft partners on Azure.",
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
      description: "Back-end developer of BI/Inventory tools and system administrator",
      technologies: ["Java (Spring)"],
      responsibilities: [
        "Developed back-end inventory system which tracks stock inventory and purchasing trends.",
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
        "Consultant specializing in web development, distributed systems, containerization technologies, and Azure",
      technologies: [
        "Kubernetes",
        "Docker",
        "Azure",
        "TypeScript (React, Nest)",
        "PHP (WordPress, CraftCMS)",
        "Ruby (Rails)",
      ],
      responsibilities: [
        "Azure consultant specializing in highly available distributed systems.",
        "Give guidance on migrations towards containerized infrastructures.",
        "Architect micro-service ecosystems.",
        "General full stack web development.",
        "SEO Optimization, Google AMP and Analytics deployment.",
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
      Icon: Kubernetes,
    },
    {
      skill: "TypeScript/JavaScript",
      tools: ["Node.js", "Nest", "TypeORM", "Koa.js", "React", "Redux", "Vue.js", "jQuery"],
      Icon: Typescript,
    },
    {
      skill: "Scala/Java",
      tools: ["Databricks/Apache Spark"],
      Icon: Java,
    },
    {
      skill: "PHP",
      tools: ["Symfony", "WordPress", "CraftCMS"],
      Icon: PHP,
    },
    {
      skill: "Ruby",
      tools: ["Rails", "Sinatra"],
      Icon: Ruby,
    },
    {
      skill: "Go",
      tools: ["Hugo"],
      Icon: Go,
    },
    {
      skill: "C/C++",
      tools: ["Boost", "OpenGL"],
      Icon: C,
    },
    {
      skill: "Database/KV Store",
      tools: ["Azure Cosmos DB", "PostgreSQL", "MySQL/MariaDB", "MongoDB", "SQLite", "Redis"],
      Icon: Redis,
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
      Icon: Webpack,
    },
  ],
};

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

const NoStyleUL: StatelessComponent = ({ children }) => (
  <ul className="NoStyleUL" style={{ listStyle: "none", paddingLeft: "0.25em", margin: "0" }}>
    {children}
  </ul>
);

const Skill: StatelessComponent<ISkill> = ({ skill, tools, Icon }) => (
  <li key={skill}>
    <InlineIcon>
      <Icon />
    </InlineIcon>
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
      <NoStyleUL>
        {responsibilities.map((responsibility) => (
          <li key={responsibility}>
            <InlineIcon>
              <svg viewBox="0 0 1792 1792">
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45L531 45q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
              </svg>
            </InlineIcon>
            {responsibility}
          </li>
        ))}
      </NoStyleUL>
    </div>
  </div>
);

const Education: StatelessComponent<IEducation> = ({ school, degree, website, conferralDate }) => (
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
      <span className="conferred">
        {monthMap[conferralDate.getMonth()] + " " + conferralDate.getFullYear()}
      </span>
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

const Resume: React.StatelessComponent<IResume> = ({
  profile,
  education,
  experience,
  skills,
}) => (
  <article className="Resume">
    <Section className="profile" heading="Profile">
      <p className="body">{profile}</p>
    </Section>
    <Section className="skills" heading="Skills">
      <NoStyleUL>{skills.map(Skill)}</NoStyleUL>
    </Section>
    <Section className="experience" heading="Experience">
      {experience.map(Job)}
    </Section>
    <Section className="education" heading="Education">
      {education.map(Education)}
    </Section>
  </article>
);

export default (() => <Resume {...resume} />) as StatelessComponent<IResume>;
