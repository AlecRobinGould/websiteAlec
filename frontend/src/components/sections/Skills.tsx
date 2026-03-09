import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: ${theme.spacing.lg};
  width: 100%;
  margin-top: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xl};
    margin-top: ${theme.spacing.xl};
  }
`;

const SkillCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
  transition: all ${theme.transitions.default};
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(246, 177, 122, 0.15);
    background: ${theme.colors.glass.card};
  }
`;

const SkillCategory = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.light};
  font-weight: 600;
`;

const SkillList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textLight};
  opacity: 0.9;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: ${theme.colors.accent};
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const skillCategories = [
  
  {
    id: 1,
    title: 'Software Engineering',
    skills: ['C/C++', 'Python', 'Bash', 'MATLAB'],
  },
  {
    id: 2,
    title: 'Embedded Systems',
    skills: ['ESP32', 'Arduino', 'FreeRTOS', 'TinyML', 'RaspberryPi', 'PlatformIO']
  },
  {
    id: 3,
    title: 'Electronics',
    skills: ['Autodesk Eagle', 'LT Spice', 'Autodesk Fusion 360']
  },

  {
    id: 4,
    title: 'Electromagnetics',
    skills: ['Ansys HFSS', 'Antenna Design', 'EM/RF Measurements']
  },
  {
    id: 5,
    title: 'DevOps',
    skills: ['Docker', 'Git', 'ClickUp'],
  },
  {
    id: 6,
    title: 'Web',
    skills: ['TypeScript', 'JavaScript', 'php', 'HTML',]
  },
];

const Skills = () => {
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
    <SkillsSection id="skills" role="region" aria-label="Skills and Expertise">
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="heading"
          aria-level={2}
        >
          Skills & Expertise
        </SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SkillsGrid role="list">
            {skillCategories.map((category) => (
              <SkillCard
                key={category.id}
                variants={itemVariants}
                role="listitem"
              >
                <SkillCategory>{category.title}</SkillCategory>
                <SkillList>
                  {category.skills.map((skill) => (
                    <SkillItem key={skill}>{skill}</SkillItem>
                  ))}
                </SkillList>
              </SkillCard>
            ))}
          </SkillsGrid>
        </motion.div>
      </div>
    </SkillsSection>
  );
};

export default Skills;
