import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: calc(${theme.spacing.xl} * 1.5);
  color: ${theme.colors.textLight};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: calc(${theme.spacing.xl} * 2);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: ${theme.spacing.lg};
  width: 100%;
  margin-top: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xl};
    margin-top: ${theme.spacing.xl};
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  border-radius: 12px;
  overflow: hidden;
  color: ${theme.colors.textLight};
  transition: all ${theme.transitions.default};
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(246, 177, 122, 0.15);
  }
`;

const ProjectImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 180px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;

  @media (min-width: ${theme.breakpoints.md}) {
    height: 220px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, ${theme.colors.glass.card}, transparent);
  }
`;

const ProjectContent = styled.div`
  padding: ${theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.light};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.lg};
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.6;
  flex: 1;
  opacity: 0.9;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const TechTag = styled.span`
  background: ${theme.colors.glass.card};
  color: ${theme.colors.accent};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 500;
  transition: all ${theme.transitions.default};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 6px 12px;
  }

  &:hover {
    background: ${theme.colors.gradient.accent};
    color: ${theme.colors.textDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(246, 177, 122, 0.2);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: auto;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  a {
    color: ${theme.colors.accent};
    font-size: clamp(1rem, 2vw, 1.2rem);
    transition: all ${theme.transitions.default};
    padding: ${theme.spacing.xs};
    border-radius: 4px;

    &:hover {
      color: ${theme.colors.light};
      background: ${theme.colors.glass.card};
      transform: translateY(-2px);
    }
  }
`;

const projects = [
  {
    id: 1,
    title: 'Vacuum sensor tester',
    description: 'An embedded system project that automates, expidites, and improves testing of vacuum sensors on a production scale.',
    image: 'https://github.com/user-attachments/assets/04c04bde-962a-416b-8f3e-f8e5558cdaf3',
    techStack: ['Python', 'C/C++', 'Autodesk Fusion', 'PlatformIO'],
    githubUrl: 'https://github.com/AlecRobinGould/Pressure-sensor-GUI-app',
    liveUrl: 'https://github.com/AlecRobinGould/Pressure-sensor-GUI-app/releases',
  },
    {
    id: 2,
    title: 'Helium Purge Jig',
    description: 'Embedded system project to automate, expedite and improved the purging of helium equipment on a production scale.',
    image: 'https://github.com/user-attachments/assets/5a16a5ad-afd4-4100-b59c-ec4df42066d4',
    techStack: ['Python', 'C/C++', 'Bash', 'Ubuntu', 'Raspberry Pi', 'Multi-core processing'],
    githubUrl: 'https://github.com/AlecRobinGould/purgeJigPii',
    liveUrl: 'https://github.com/user-attachments/files/25684922/Conference.style.paper.purge.jig.pdf',
  },
  {
    id: 3,
    title: 'ESP NOW auto pairing library',
    description: 'An open source library for ESP 32s to automatically pair with each other using ESP NOW, without the need to explicitly share hardcoded MAC addresses.',
    image: 'https://github.com/user-attachments/assets/f57d68f4-200b-4f6b-91c8-d227503e8de8',
    techStack: ['C++', 'ESP32', 'ESP NOW', 'IOT', 'WiFi'],
    githubUrl: 'https://github.com/AlecRobinGould/esp_now_auto_pairing',
    liveUrl: 'https://github.com/AlecRobinGould/esp_now_auto_pairing.git/',
  },
  {
    id: 4,
    title: 'Dynamic QR codes',
    description: 'A self-hosted website to generate and store dynamic QR codes.',
    image: 'https://github.com/AlecRobinGould/AntennasQRcodes/assets/95220293/0d21113d-6da1-42b5-a5d2-a89590468e24',
    techStack: ['JavaScript', 'PHP', 'CSS', 'HTML', 'MySQL'],
    githubUrl: 'https://github.com/AlecRobinGould/AntennasQRcodes',
    liveUrl: 'http://qr.emss.co.za:8213/',
  },
    {
    id: 5,
    title: 'Additive Manufacturing of Antennas',
    description: 'A process to resin print (SLA), and metalize the surface of an antenna.',
    image: 'https://github.com/user-attachments/assets/bd33c01d-919a-42af-a2ee-38e0898938bb',
    techStack: ['Ansys HFSS', 'Autodesk Fusion 360', 'Python', 'ChituBox', 'Electroless Plating'],
    githubUrl: 'https://github.com/AlecRobinGould/Honours-public',
    liveUrl: 'https://github.com/AlecRobinGould/Honours-public/blob/main/Additive%20Manufacturing%20in%20Ka-band%20Antenna%20Engineering.pdf',
  },
  {
    id: 6,
    title: 'RSC Integration Automation',
    description: 'SaaP developed to automate a tedious process of integrating software/updates.',
    image: 'https://github.com/EMSS-Antennas/RSC-S-band-Intergration-Automation-Public/assets/95220293/bb226040-a19f-42ee-a4ea-45c2a11495ad',
    techStack: ['python', 'Bash', 'Linux', 'Networking', 'SaaP'],
    githubUrl: 'https://github.com/EMSS-Antennas/RSC-S-band-Intergration-Automation-Public',
    liveUrl: 'https://github.com/EMSS-Antennas/RSC-S-band-Intergration-Automation-Public/assets/95220293/5b8887be-2d01-4ffa-b22c-54c3176d1a86',
  },
  {
    id: 7,
    title: 'S-Parameter Viewer',
    description: 'Application developed to visualize and obtain metrics such as average attenuation, etc.',
    image: 'https://github.com/AlecRobinGould/Scattering-parameter-viewer/assets/95220293/85676b08-cc6e-496e-b5ac-db740fb02091',
    techStack: ['python', 'VNA', 'RF measurements', 'SaaP'],
    githubUrl: 'https://github.com/EMSS-Antennas/Scattering-parameter-viewer',
    liveUrl: 'https://github.com/EMSS-Antennas/Scattering-parameter-viewer/releases/tag/V1.1',
  },
];

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ProjectsSection id="projects" role="region" aria-label="Featured Projects">
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="heading"
          aria-level={2}
        >
          Featured Projects
        </SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProjectGrid role="list">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                variants={itemVariants}
                role="listitem"
                aria-labelledby={`project-title-${project.id}`}
              >
                <ProjectImage
                  imageUrl={project.image}
                  role="img"
                  aria-label={`Screenshot of ${project.title}`}
                />
                <ProjectContent>
                  <ProjectTitle id={`project-title-${project.id}`}>
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack role="list" aria-label={`Technologies used in ${project.title}`}>
                    {project.techStack.map((tech) => (
                      <TechTag key={tech} role="listitem">
                        {tech}
                      </TechTag>
                    ))}
                  </TechStack>
                  <ProjectLinks>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub aria-hidden="true" />
                      <span className="sr-only">GitHub repository</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} live site`}
                    >
                      <FaExternalLinkAlt aria-hidden="true" />
                      <span className="sr-only">Live site</span>
                    </a>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </motion.div>
      </div>
    </ProjectsSection>
  );
};

export default Projects;
