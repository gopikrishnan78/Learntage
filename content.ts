import type { Chapter, Question, RevisionTask, Assessment, DataPoint } from '../types';
import { physicsChapters, sampleQuestions, demoSubjects } from './demoData';

export const mathChapters: Chapter[] = [
  {
    id: 'math-ch-1',
    subjectId: 'mathematics',
    name: 'Differentiation',
    order: 1,
    description: 'Limits, derivatives, and rate of change',
    status: 'mastered',
    mastery: 91,
    concepts: [],
    importantQuestions: [],
    previousYearQuestions: [],
    estimatedTime: 160,
    prerequisites: [],
  },
  {
    id: 'math-ch-2',
    subjectId: 'mathematics',
    name: 'Integrals',
    order: 2,
    description: 'Indefinite and definite integration techniques',
    status: 'weak',
    mastery: 58,
    concepts: [],
    importantQuestions: [],
    previousYearQuestions: [],
    estimatedTime: 200,
    prerequisites: ['math-ch-1'],
  },
  {
    id: 'math-ch-3',
    subjectId: 'mathematics',
    name: 'Applications of Derivatives',
    order: 3,
    description: 'Maxima, minima, tangents, and rate problems',
    status: 'strong',
    mastery: 80,
    concepts: [],
    importantQuestions: [],
    previousYearQuestions: [],
    estimatedTime: 140,
    prerequisites: ['math-ch-1'],
  },
];

export const chemistryChapters: Chapter[] = [
  {
    id: 'chem-ch-1',
    subjectId: 'chemistry',
    name: 'Atomic Structure',
    order: 1,
    description: 'Orbitals, quantum numbers, and electronic configuration',
    status: 'strong',
    mastery: 84,
    concepts: [],
    importantQuestions: [],
    previousYearQuestions: [],
    estimatedTime: 150,
    prerequisites: [],
  },
  {
    id: 'chem-ch-2',
    subjectId: 'chemistry',
    name: 'Organic Chemistry Basics',
    order: 2,
    description: 'Nomenclature, isomerism, and reaction mechanisms',
    status: 'weak',
    mastery: 52,
    concepts: [],
    importantQuestions: [],
    previousYearQuestions: [],
    estimatedTime: 220,
    prerequisites: ['chem-ch-1'],
  },
  {
    id: 'chem-ch-3',
    subjectId: 'chemistry',
    name: 'Chemical Kinetics',
    order: 3,
    description: 'Rate laws, order of reaction, and activation energy',
    status: 'learning',
    mastery: 61,
    concepts: [],
    importantQuestions: [],
    previousYearQuestions: [],
    estimatedTime: 180,
    prerequisites: [],
  },
];

export const fullCurriculum = demoSubjects.map((subject) => {
  if (subject.id === 'physics') return { ...subject, chapters: physicsChapters };
  if (subject.id === 'mathematics') return { ...subject, chapters: mathChapters };
  if (subject.id === 'chemistry') return { ...subject, chapters: chemistryChapters };
  return subject;
});

export const practiceBank: Question[] = [
  ...sampleQuestions,
  {
    id: 'q-3',
    conceptIds: ['concept-1'],
    text: 'If net force on a body is zero, which statement is always true?',
    type: 'mcq',
    difficulty: 'easy',
    options: [
      'The body must be at rest',
      'Acceleration of the body is zero',
      'Velocity of the body is zero',
      'The body has no mass',
    ],
    correctAnswer: 'Acceleration of the body is zero',
    explanation:
      "Newton's first and second laws: F = ma. If F = 0 then a = 0. The body may still move with constant velocity.",
    hints: [
      'Think about what force actually changes.',
      'Force is related to acceleration, not necessarily velocity.',
      'If F = 0, then a = 0.',
    ],
    previousYear: true,
    examPattern: 'CBSE 2022',
    importance: 9,
    tags: ['newton-laws', 'equilibrium'],
  },
  {
    id: 'q-4',
    conceptIds: ['concept-2'],
    text: 'A 40 N force acts at 60° to the vertical. Find the vertical component.',
    type: 'mcq',
    difficulty: 'medium',
    options: ['20 N', '34.6 N', '40 N', '69.3 N'],
    correctAnswer: '20 N',
    explanation: 'Vertical component = F cos(60°) = 40 × 0.5 = 20 N.',
    hints: [
      'Identify which angle is given relative to the vertical.',
      'Adjacent component uses cosine.',
      'cos 60° = 1/2.',
    ],
    previousYear: false,
    importance: 8,
    tags: ['vectors'],
  },
  {
    id: 'q-5',
    conceptIds: ['concept-4'],
    text: 'Electric field lines around a positive point charge:',
    type: 'mcq',
    difficulty: 'easy',
    options: [
      'Start from infinity and end on the charge',
      'Radiate outward from the charge',
      'Form closed loops around the charge',
      'Are denser far from the charge',
    ],
    correctAnswer: 'Radiate outward from the charge',
    explanation:
      'By convention, field lines originate on positive charges and terminate on negative charges.',
    hints: [
      'Remember the direction a positive test charge would move.',
      'Positive charges are sources of field lines.',
    ],
    previousYear: true,
    examPattern: 'CBSE 2024',
    importance: 8,
    tags: ['electric-field'],
  },
  {
    id: 'q-6',
    conceptIds: ['concept-3'],
    text: 'Potential difference between two points is 12 V. Work done to move 2 C of charge is:',
    type: 'mcq',
    difficulty: 'easy',
    options: ['6 J', '10 J', '24 J', '14 J'],
    correctAnswer: '24 J',
    explanation: 'W = qV = 2 × 12 = 24 J.',
    hints: ['Potential difference is work per unit charge.', 'Use W = qV.'],
    previousYear: false,
    importance: 7,
    tags: ['electric-potential'],
  },
  {
    id: 'q-7',
    conceptIds: ['concept-1'],
    text: 'A 3 kg block accelerates at 4 m/s² on a frictionless table. The applied force is _____ N.',
    type: 'numerical',
    difficulty: 'easy',
    correctAnswer: '12',
    explanation: 'F = ma = 3 × 4 = 12 N.',
    hints: ["Newton's second law: F = ma.", 'Multiply mass and acceleration.'],
    previousYear: false,
    importance: 6,
    tags: ['force'],
  },
  {
    id: 'q-9',
    conceptIds: ['concept-3'],
    text: 'A point charge q is placed at the center of an imaginary cube of side L. What is the electric flux through one face of the cube?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['q / ε₀', 'q / 6ε₀', 'q / 4πε₀', '6q / ε₀'],
    correctAnswer: 'q / 6ε₀',
    explanation:
      'By Gauss\'s Law, total flux through the closed cube is q/ε₀. Due to symmetry, the flux through each of the 6 identical faces is equal to (1/6)(q/ε₀).',
    hints: [
      'Apply Gauss\'s Law for the entire closed surface first.',
      'Consider the cubic symmetry: are all 6 faces equivalent?',
      'Divide the total enclosed flux by 6.',
    ],
    previousYear: true,
    examPattern: 'JEE Mains 2023',
    importance: 9,
    tags: ['electrostatics', 'gauss-law', 'flux'],
  },
  {
    id: 'q-10',
    conceptIds: ['math-ch-2'],
    text: 'Evaluate the definite integral: ∫₀^(π/2) sin²(x) dx.',
    type: 'mcq',
    difficulty: 'medium',
    options: ['π/4', 'π/2', '1', '1/2'],
    correctAnswer: 'π/4',
    explanation:
      'Using the identity sin²(x) = (1 - cos(2x))/2, the integral becomes ∫₀^(π/2) (1/2 - cos(2x)/2) dx = [x/2 - sin(2x)/4] from 0 to π/2 = π/4 - 0 = π/4.',
    hints: [
      'Use the half-angle formula for sin²(x).',
      'sin²(x) = (1 - cos(2x)) / 2.',
      'Integrate term-by-term and substitute limits 0 and π/2.',
    ],
    previousYear: true,
    examPattern: 'CBSE 2023',
    importance: 9,
    tags: ['calculus', 'definite-integration', 'trigonometry'],
  },
  {
    id: 'q-11',
    conceptIds: ['chem-ch-2'],
    text: 'In the nucleophilic addition of HCN to an aldehyde (e.g., acetaldehyde), which species acts as the initial nucleophile attacking the carbonyl carbon?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['CN⁻ (Cyanide ion)', 'H⁺ (Proton)', 'HCN molecule', 'OH⁻ (Hydroxide)'],
    correctAnswer: 'CN⁻ (Cyanide ion)',
    explanation:
      'The reaction is base-catalyzed to generate the strong nucleophile CN⁻. The cyanide ion attacks the electrophilic carbonyl carbon (C=O) forming a tetrahedral cyanohydrin intermediate.',
    hints: [
      'Look at the carbonyl group (C=O): oxygen is electronegative, making carbon electrophilic (δ+).',
      'The attacking species must be electron-rich with a lone pair or negative charge.',
      'CN⁻ is the generated nucleophile in base-catalyzed cyanohydrin formation.',
    ],
    previousYear: true,
    examPattern: 'JEE Mains 2024',
    importance: 8,
    tags: ['organic-chemistry', 'aldehydes', 'reaction-mechanism'],
  },
  {
    id: 'q-12',
    conceptIds: ['concept-1'],
    text: 'A projectile is launched with speed 40 m/s at 30° to the horizontal. Take g = 10 m/s². What is the maximum height attained?',
    type: 'numerical',
    difficulty: 'medium',
    correctAnswer: '20',
    explanation:
      'Vertical velocity u_y = u sin(30°) = 40 × 0.5 = 20 m/s. Max height H = (u_y)² / (2g) = 400 / 20 = 20 meters.',
    hints: [
      'Find the vertical component of the initial velocity: u_y = u sin(θ).',
      'Use the kinematic equation v_y² = u_y² - 2gH with v_y = 0 at the top.',
      'H = (u sin θ)² / (2g).',
    ],
    previousYear: true,
    examPattern: 'CBSE 2022',
    importance: 8,
    tags: ['kinematics', 'projectile-motion'],
  },
  {
    id: 'q-13',
    conceptIds: ['math-ch-1'],
    text: 'If matrix A is symmetric, then A - Aᵀ is always equal to:',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Zero matrix (O)', 'Identity matrix (I)', '2A', 'Skew-symmetric matrix'],
    correctAnswer: 'Zero matrix (O)',
    explanation:
      'For a symmetric matrix, by definition Aᵀ = A. Therefore, A - Aᵀ = A - A = O (Null/Zero matrix).',
    hints: [
      'Recall the definition of a symmetric matrix.',
      'If A is symmetric, what is Aᵀ?',
      'Subtracting an identical matrix from itself yields zero.',
    ],
    previousYear: false,
    examPattern: 'CBSE Board',
    importance: 7,
    tags: ['matrices', 'algebra'],
  },
  {
    id: 'q-14',
    conceptIds: ['chem-ch-1'],
    text: 'According to VSEPR theory, the geometry of methane (CH₄) is _____ with a bond angle of 109.5°.',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Tetrahedral', 'Trigonal planar', 'Octahedral', 'Linear'],
    correctAnswer: 'Tetrahedral',
    explanation:
      'Carbon has 4 valence electrons forming 4 single bonds with zero lone pairs (sp³ hybridization), resulting in a regular tetrahedral geometry.',
    hints: [
      'Carbon forms 4 equivalent sigma bonds with hydrogen.',
      'Check the steric number (4 bonds + 0 lone pairs = 4).',
      'Steric number 4 corresponds to tetrahedral geometry.',
    ],
    previousYear: false,
    importance: 7,
    tags: ['chemical-bonding', 'molecular-geometry'],
  },
];

export const revisionQueue: RevisionTask[] = [
  {
    id: 'rev-1',
    conceptId: 'concept-2',
    userId: 'user-1',
    priority: 9,
    reason: 'Forgetting risk is 45% after 6 days without spaced review.',
    scheduledFor: new Date(),
    completed: false,
  },
  {
    id: 'rev-2',
    conceptId: 'concept-3',
    userId: 'user-1',
    priority: 8,
    reason: 'New concept — first review due within 24 hours of learning.',
    scheduledFor: new Date(),
    completed: false,
  },
  {
    id: 'rev-3',
    conceptId: 'concept-4',
    userId: 'user-1',
    priority: 5,
    reason: 'Response time increased 25% — early warning of fading fluency.',
    scheduledFor: new Date(Date.now() + 86400000),
    completed: false,
  },
];

export const demoAssessments: Assessment[] = [
  {
    id: 'exam-1',
    title: 'Laws of Motion — 10 min check',
    type: 'proactive',
    subjectId: 'physics',
    chapterIds: ['chapter-1'],
    questions: practiceBank.filter((q) => q.conceptIds.includes('concept-1') || q.conceptIds.includes('concept-2')).slice(0, 5),
    duration: 10,
    totalMarks: 25,
    createdAt: new Date(),
    isProactive: true,
    reason: 'Mastery in Laws of Motion crossed 85%. Time to validate under exam conditions.',
  },
  {
    id: 'exam-2',
    title: 'Electrostatics diagnostic',
    type: 'diagnostic',
    subjectId: 'physics',
    chapterIds: ['chapter-2'],
    questions: practiceBank.filter((q) => q.conceptIds.includes('concept-3') || q.conceptIds.includes('concept-4')),
    duration: 15,
    totalMarks: 20,
    createdAt: new Date(),
    isProactive: false,
    reason: 'Electric Potential is still in the learning band.',
  },
  {
    id: 'exam-3',
    title: 'Full Physics mock — Unit 1',
    type: 'mock',
    subjectId: 'physics',
    chapterIds: ['chapter-1', 'chapter-2'],
    questions: practiceBank.slice(0, 6),
    duration: 30,
    totalMarks: 40,
    createdAt: new Date(),
    isProactive: false,
  },
];

export const masteryTrend: DataPoint[] = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  return { date, value: 68 + i * 1.1 + (i % 3) };
});

export const independenceTrend: DataPoint[] = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  return { date, value: 62 + i * 1.6 };
});

export const accuracyTrend: DataPoint[] = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  return { date, value: 71 + Math.sin(i / 2) * 6 + i * 0.6 };
});

export const conceptLookup: Record<string, { name: string; subject: string }> = {
  'concept-1': { name: 'Force and Motion', subject: 'Physics' },
  'concept-2': { name: 'Vector Components', subject: 'Physics' },
  'concept-3': { name: 'Electric Potential', subject: 'Physics' },
  'concept-4': { name: 'Electric Field', subject: 'Physics' },
};

export const mindMapLayout = {
  chapterId: 'chapter-1',
  nodes: [
    { id: 'n1', label: 'Laws of Motion', x: 50, y: 18, status: 'mastered', mastery: 88, conceptId: 'chapter-1' },
    { id: 'n2', label: 'Inertia', x: 22, y: 42, status: 'mastered', mastery: 90, conceptId: 'concept-1' },
    { id: 'n3', label: 'F = ma', x: 50, y: 48, status: 'mastered', mastery: 92, conceptId: 'concept-1' },
    { id: 'n4', label: 'Action-Reaction', x: 78, y: 42, status: 'strong', mastery: 84, conceptId: 'concept-1' },
    { id: 'n5', label: 'Vectors', x: 28, y: 72, status: 'weak', mastery: 62, conceptId: 'concept-2' },
    { id: 'n6', label: 'Friction', x: 72, y: 72, status: 'learning', mastery: 70, conceptId: 'concept-1' },
    { id: 'n7', label: 'Applications', x: 50, y: 90, status: 'strong', mastery: 80, conceptId: 'concept-1' },
  ],
  links: [
    ['n1', 'n2'],
    ['n1', 'n3'],
    ['n1', 'n4'],
    ['n2', 'n5'],
    ['n3', 'n5'],
    ['n3', 'n6'],
    ['n4', 'n6'],
    ['n5', 'n7'],
    ['n6', 'n7'],
  ] as [string, string][],
};
