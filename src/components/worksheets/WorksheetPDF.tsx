// components/WorksheetPDF.tsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { gradeLevels } from '@/data/syllabus';

const PDF_SAFE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/×/g, 'x'],
  [/÷/g, '/'],
  [/•/g, '-'],
  [/→/g, '->'],
  [/←/g, '<-'],
  [/≥/g, '>='],
  [/≤/g, '<='],
  [/≠/g, '!='],
  [/≈/g, '~'],
  [/—/g, '-'],
  [/–/g, '-'],
  [/°/g, ' deg '],
  [/²/g, '^2'],
  [/³/g, '^3'],
  [/½/g, '1/2'],
  [/⅓/g, '1/3'],
  [/¼/g, '1/4'],
  [/⅔/g, '2/3'],
  [/¾/g, '3/4'],
  [/⅛/g, '1/8']
];

Font.registerEmojiSource({
  format: 'png',
  builder: (code) => `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/${code}.png`,
});

function sanitizePdfText(value: string | undefined | null): string {
  if (!value) return '';

  const normalized = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');

  const replaced = PDF_SAFE_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    normalized
  );

  return replaced
    .replace(/[\u200B-\u200D\uFE0F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #3B82F6',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 10
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8,
    backgroundColor: '#EFF6FF',
    padding: 5
  },
  problem: {
    marginBottom: 10,
    padding: 8,
    border: '1px solid #E5E7EB',
    borderRadius: 4
  },
  problemText: {
    fontSize: 12,
    marginBottom: 4
  },
  answerSpace: {
    height: 20,
    borderBottom: '1px dashed #9CA3AF',
    marginTop: 5
  },
  gradeInfo: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 3
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9CA3AF'
  }
});

interface WorksheetPDFProps {
  gradeId: string;
  topicId: string;
  problems: Array<{
    question: string;
    type: string;
    difficulty: string;
    visualAid?: string;
  }>;
  studentName?: string;
}

export const WorksheetPDF = ({ gradeId, topicId, problems, studentName }: WorksheetPDFProps) => {
  const grade = gradeLevels.find(g => g.id === gradeId);
  const topic = grade?.topics.find(t => t.id === topicId);
  const gradeTitle = sanitizePdfText(grade?.title);
  const topicTitle = sanitizePdfText(topic?.title);
  const difficulty = sanitizePdfText(topic?.difficulty);
  const sanitizedStudentName = sanitizePdfText(studentName);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CoolMathsZone Worksheet</Text>
          <Text style={styles.subtitle}>
            {gradeTitle} - {topicTitle}
          </Text>
          {sanitizedStudentName && (
            <Text style={styles.subtitle}>Student: {sanitizedStudentName}</Text>
          )}
          <Text style={styles.gradeInfo}>
            Date: {new Date().toLocaleDateString()} | Difficulty: {difficulty}
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.problemText}>
            - Show your work for each problem
          </Text>
          <Text style={styles.problemText}>
            - Check your answers when finished
          </Text>
          <Text style={styles.problemText}>
            - Take your time and think carefully
          </Text>
        </View>

        {/* Problems */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Math Problems</Text>
          {problems.map((problem, index) => (
            <View key={index} style={styles.problem}>
              <Text style={styles.problemText}>
                {index + 1}. {sanitizePdfText(problem.question)}
              </Text>
              {problem.visualAid && (
                <Text style={{ fontSize: 20, marginTop: 4 }}>
                  {problem.visualAid}
                </Text>
              )}
              <View style={styles.answerSpace} />
            </View>
          ))}
        </View>

        {/* Answer Key Section (for teachers/parents) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Answer Key (For Checking)</Text>
          {problems.map((problem, index) => (
            <View key={index} style={styles.problem}>
              <Text style={styles.problemText}>
                {index + 1}. _________________
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by CoolMathsZone | www.coolmathszone.com | Practice makes perfect!
        </Text>
      </Page>
    </Document>
  );
};
