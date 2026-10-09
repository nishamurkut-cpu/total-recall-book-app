import { 
  SubjectQuiz, 
  SampleChapter, 
  DailyNote, 
  ShopConfig, 
  VideoItem, 
  ClinicalImage, 
  TabConfig,
  Order 
} from '../types';

export const INITIAL_TABS: TabConfig[] = [
  { id: 'home', label: 'Home', enabled: true, order: 1 },
  { id: 'daily-notes', label: "Daily notes", enabled: true, order: 2 },
  { id: 'daily-quiz', label: "Daily quiz", enabled: true, order: 3 },
  { id: 'subject-quizzes', label: 'Subject quizzes', enabled: true, order: 4 },
  { id: 'samples', label: 'Samples', enabled: true, order: 5 },
  { id: 'videos', label: 'Videos', enabled: true, order: 6 },
  { id: 'images', label: 'Images', enabled: true, order: 7 },
  { id: 'buy', label: 'Buy the book', enabled: true, order: 8 },
  { id: 'orders', label: 'My orders', enabled: true, order: 9 },
  { id: 'about', label: 'About', enabled: true, order: 10 },
];

export const INITIAL_SHOP_CONFIG: ShopConfig = {
  upiId: '8766492530-3@ybl',
  accountName: 'KIRAN SURESH MURKUT',
  setPrice: 1999,
  setMrp: 2390,
  vol1Price: 1195,
  vol1Mrp: 1195,
  vol2Price: 1195,
  vol2Mrp: 1195,
  deliveryFee: 0,
  isOpen: true,
  noticeBanner: '🔥 Special Edition for AIIMS NORCET, ESIC & RRB 2026 — Dispatching within 24 hours via India Post Speed Post with tracking!',
  aboutText: 'Total Recall is the definitive 2-volume masterwork compiled by Kiran S. M. (Patil) for nursing aspirants across India. Over 2,400 pages of golden points, past 10 years memory questions, clinical flowcharts, and high-yield MCQs.',
};

export const INITIAL_SAMPLE_CHAPTERS: SampleChapter[] = [
  {
    id: 'ch-digestive',
    title: 'Digestive System (Unit 1)',
    subtitle: 'Anatomy, Gastric Secretions, Peptic Ulcers & Post-Gastrectomy Complications',
    unit: 'Medical-Surgical & Anatomy Volume 1',
    pageRange: 'Pages 1 – 5',
    pages: [
      {
        pageNumber: 1,
        header: 'TOTAL RECALL • VOLUME 1 • GASTROINTESTINAL SYSTEM',
        title: 'Anatomy of Stomach & Gastric Cellular Secretions',
        content: [
          'The stomach is a J-shaped muscular enlargement of the GI tract located in the epigastric, umbilical, and left hypochondriac regions. It serves as a reservoir for ingested food before passing into the duodenum.',
          'The stomach wall contains gastric glands lined with specialized secretory cells essential for chemical digestion:',
          '1. Parietal (Oxyntic) Cells: Secrete Hydrochloric acid (HCl) which lowers gastric pH to 1.5–2.0 (bactericidal action, pepsinogen activation) and Intrinsic Factor (Castle’s factor) indispensable for Vitamin B12 absorption in the terminal ileum.',
          '2. Chief (Peptic/Zymogenic) Cells: Secrete Pepsinogen, an inactive proenzyme converted to active Pepsin in an acidic medium for protein degradation.',
          '3. Mucous Neck Cells: Secrete alkaline mucin that coats gastric mucosa, shielding it against self-digestion and corrosive acid.'
        ],
        keyPoints: [
          'Parietal cells = HCl + Intrinsic factor (IF). Destruction leads to Pernicious Anemia.',
          'Chief cells = Pepsinogen (cleaves proteins).',
          'G-cells (in pyloric antrum) = Gastrin hormone (stimulates parietal cells).'
        ],
        clinicalAlert: '⚠️ NORCET HIGHLIGHT: Resection of the stomach (Total Gastrectomy) leads to irreversible loss of Intrinsic Factor. Patient requires lifelong parenteral (IM) Vitamin B12 (Cyanocobalamin) replacement!'
      },
      {
        pageNumber: 2,
        header: 'TOTAL RECALL • VOLUME 1 • GASTROINTESTINAL SYSTEM',
        title: 'Peptic Ulcer Disease: Gastric vs Duodenal Ulcer Differential',
        content: [
          'Peptic Ulcer Disease (PUD) encompasses mucosal erosions occurring in areas exposed to pepsin and acid. Over 80–90% of duodenal ulcers and 70% of gastric ulcers are attributed to Helicobacter pylori colonization.',
          'Clinical differentiation between Gastric and Duodenal ulcers is one of the most frequently tested topics in nursing competitive exams.'
        ],
        table: {
          caption: 'Table 1.1: Rapid Comparison of Gastric vs Duodenal Ulcer',
          headers: ['Feature', 'Gastric Ulcer', 'Duodenal Ulcer'],
          rows: [
            ['Incidence Age', 'Usually 50+ years, equal gender ratio', 'Usually 30–50 years, M > F (3:1)'],
            ['Pain Timing', 'Pain 30–60 min after meals (eating worsens pain)', 'Pain 2–3 hours after meals / midnight pain (eating relieves pain)'],
            ['Food Intake Effect', 'Food precipitates pain (leads to weight loss & anorexia)', 'Food or antacids alleviate pain (patient often gains weight)'],
            ['Gastric Acid', 'Normal to hyposecretion', 'Hypersecretion of HCl'],
            ['Malignant Potential', 'Risk of malignancy (biopsy required)', 'Extremely rare malignancy'],
            ['Most Common Site', 'Lesser curvature of stomach', 'First part of duodenum (duodenal bulb)']
          ]
        },
        keyPoints: [
          'Duodenal Ulcer: "Pain-Food-Relief" cycle.',
          'Gastric Ulcer: "Food-Pain" cycle.',
          'H. pylori first-line Triple Regimen: PPI + Clarithromycin + Amoxicillin for 14 days.'
        ]
      },
      {
        pageNumber: 3,
        header: 'TOTAL RECALL • VOLUME 1 • GASTROINTESTINAL SYSTEM',
        title: 'Complications of Peptic Ulcer Disease',
        content: [
          'Major life-threatening complications of PUD include Hemorrhage, Perforation, and Pyloric Stenosis (Gastric Outlet Obstruction).',
          '1. Perforation (Acute Surgical Abdomen): Occurs when ulcer erodes through full wall thickness. Hallmark signs: Sudden excruciating epigastric pain radiating to shoulder, Board-like rigidity of abdominal wall, absent bowel sounds.',
          '2. Upright abdominal X-ray demonstrates Free gas under right hemidiaphragm (pneumoperitoneum). Immediate nursing action: Keep patient NPO, insert large-bore nasogastric tube for decompression, notify surgeon immediately, IV crystalloids.',
          '3. Hemorrhage: Manifests as hematemesis (coffee-ground or bright red emesis) or melena (tarry black stools from oxidized hemoglobin).'
        ],
        keyPoints: [
          'Board-like rigid abdomen = Hallmark of acute peritonitis / hollow viscus perforation.',
          'Coffee-ground emesis = blood altered by gastric acid.',
          'Active hematemesis position = Left lateral or Semi-Fowler to prevent aspiration.'
        ],
        clinicalAlert: '⚡ GOLDEN MEMORY BULLET: Never administer morphine or analgetic before acute surgical evaluation of rigid abdomen, as it masks diagnostic signs!'
      },
      {
        pageNumber: 4,
        header: 'TOTAL RECALL • VOLUME 1 • GASTROINTESTINAL SYSTEM',
        title: 'Post-Gastrectomy Syndromes & Dumping Syndrome',
        content: [
          'Surgical interventions for ulcer disease include Billroth I (Gastroduodenostomy), Billroth II (Gastrojejunostomy), and Total Gastrectomy.',
          'Dumping Syndrome occurs due to rapid emptying of hyperosmolar gastric chyme into the jejunum, drawing circulating fluid from vascular compartment into intestinal lumen via osmosis.',
          '• Early Dumping (15–30 mins post-meal): Diaphoresis, pallor, palpitations, dizziness, syncope, abdominal cramping, explosive diarrhea.',
          '• Late Dumping (2–3 hours post-meal): Rapid carbohydrate absorption causes sudden surge in insulin, precipitating Reactive Hypoglycemia.'
        ],
        keyPoints: [
          'Dietary modification for Dumping: High protein, high fat, low simple carbohydrates.',
          'Fluid restriction: Avoid liquids with meals! Drink fluids 1 hour before or 1 hour after meals.',
          'Post-meal posture: Lie down in recumbent or Semi-Fowler position for 20–30 mins after meals to slow gastric transit.'
        ]
      },
      {
        pageNumber: 5,
        header: 'TOTAL RECALL • VOLUME 1 • GASTROINTESTINAL SYSTEM',
        title: 'Diagnostic Procedures & Nursing Care of GI Endoscopy',
        content: [
          'Esophagogastroduodenoscopy (EGD) allows direct endoscopic visualization of esophagus, stomach, and duodenal mucosa.',
          'Pre-procedure nursing responsibilities:',
          '• Maintain NPO status for at least 6 to 8 hours prior to procedure to prevent aspiration.',
          '• Check informed consent, remove dental prostheses/dentures.',
          '• Administer local topical spray (e.g. Lidocaine) to suppress gag reflex, alongside conscious sedation.',
          'Post-procedure priorities:',
          '• Top Priority: Monitor return of Gag Reflex before offering oral fluids or foods! (Touch posterior pharynx with tongue depressor).',
          '• Monitor for potential esophageal perforation: sudden retrosternal or neck pain, dysphagia, subcutaneous emphysema (crepitus in neck), tachycardia.'
        ],
        keyPoints: [
          'First post-EGD action = Assess gag reflex before giving anything by mouth.',
          'Subcutaneous crepitus after endoscopy = Esophageal perforation alert.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-dig-1',
        question: 'Which gastric cells secrete Intrinsic Factor necessary for Vitamin B12 absorption?',
        options: ['Chief cells', 'Parietal cells', 'Goblet cells', 'Enteroendocrine cells'],
        answer: 'B',
        explanation: 'Parietal (oxyntic) cells secrete Hydrochloric Acid (HCl) and Intrinsic Factor. Destruction of parietal cells or total gastrectomy causes loss of Intrinsic Factor, causing Pernicious Anemia.'
      },
      {
        id: 'q-dig-2',
        question: 'A nurse assesses a client with duodenal ulcer. Which clinical finding is most characteristic?',
        options: [
          'Pain occurring 30 minutes after eating, aggravated by food',
          'Pain occurring 2 to 3 hours after a meal, often relieved by food intake',
          'Persistent weight loss and anorexia due to fear of eating',
          'Absence of pain during midnight hours'
        ],
        answer: 'B',
        explanation: 'Duodenal ulcer pain typically occurs 2-3 hours postprandially or at night when the stomach is empty. Eating or ingesting antacids buffers acid and relieves symptoms.'
      },
      {
        id: 'q-dig-3',
        question: 'Which dietary instruction is paramount to prevent Dumping Syndrome following partial gastrectomy?',
        options: [
          'Consume large carbohydrate-rich meals with generous liquids during dining',
          'Drink 2 glasses of water with each meal to facilitate digestion',
          'Eat small, frequent meals high in protein and fat, avoiding liquids during meals',
          'Remain in an upright sitting posture for 2 hours after every meal'
        ],
        answer: 'C',
        explanation: 'Management of Dumping Syndrome involves eating small, frequent meals high in protein and complex fats, low in refined carbs, and avoiding fluids with meals to retard rapid transit into the jejunum.'
      }
    ]
  },
  {
    id: 'ch-labour',
    title: 'Mechanism of Normal Labour',
    subtitle: 'Cardinal Movements, Diameters, Crowning & Active Stage 2 Nursing Care',
    unit: 'Obstetrics & Gynaecological Nursing Volume 2',
    pageRange: 'Pages 6 – 10',
    pages: [
      {
        pageNumber: 6,
        header: 'TOTAL RECALL • VOLUME 2 • OBSTETRICS & MIDWIFERY',
        title: 'Cardinal Movements of Normal Labour Overview',
        content: [
          'The mechanism of labour represents the series of passive movements and adaptations undertaken by the presenting fetal head in navigating the maternal pelvic canal.',
          'Sequential Cardinal Movements:',
          '1. Engagement',
          '2. Descent',
          '3. Flexion',
          '4. Internal Rotation',
          '5. Crowning',
          '6. Extension',
          '7. Restitution',
          '8. External Rotation',
          '9. Expulsion of Trunk'
        ],
        keyPoints: [
          'Mnemonic: Every Darn Fool In College Enjoys Real Educational Experiences (Engagement, Descent, Flexion, Internal rotation, Crowning, Extension, Restitution, External rotation, Expulsion).',
          'Most common normal presentation: Vertex presentation with Left Occipito-Anterior (LOA) position.'
        ]
      },
      {
        pageNumber: 7,
        header: 'TOTAL RECALL • VOLUME 2 • OBSTETRICS & MIDWIFERY',
        title: 'Engagement, Descent & Flexion',
        content: [
          '1. Engagement: Occurs when the widest biparietal diameter (9.5 cm) has traversed the pelvic inlet. In primigravida, engagement typically occurs 2 to 3 weeks before expected delivery; in multigravida, it often occurs at the onset of labour.',
          'Station: Level of the fetal presenting part relative to the maternal ischial spines.',
          '• Station 0 = Level of ischial spines (Engaged head).',
          '• Station -1, -2, -3 = Centimeters above spines.',
          '• Station +1, +2, +3 = Centimeters below spines; +4/+5 = Head at perineal introitus.',
          '2. Descent: Continuous process throughout labour, powered by uterine contractions, maternal pushing, and amniotic fluid pressure.',
          '3. Flexion: As descending head meets resistance of pelvic floor / cervix, flexion increases so that the shorter Suboccipito-bregmatic diameter (9.5 cm) replaces the longer Occipito-frontal diameter (11.5 cm).'
        ],
        keyPoints: [
          'Station 0 = Presenting part at maternal ischial spines.',
          'Suboccipito-bregmatic diameter = 9.5 cm (Ideal engaging diameter in vertex presentation).'
        ]
      },
      {
        pageNumber: 8,
        header: 'TOTAL RECALL • VOLUME 2 • OBSTETRICS & MIDWIFERY',
        title: 'Internal Rotation and Crowning',
        content: [
          '4. Internal Rotation: The occiput rotates 1/8th of a circle (45 degrees) anteriorly towards the symphysis pubis (in LOA/ROA positions), so the anteroposterior diameter of the fetal head aligns with the longest AP diameter of the pelvic outlet.',
          '5. Crowning: The widest diameter of the fetal head (biparietal diameter) stretches the vulval ring without receding back between contractions.',
          'Clinical significance: Crowning marks the optimal moment for performing an Episiotomy (mediolateral incision) to prevent third-degree perineal lacerations.'
        ],
        clinicalAlert: '⚠️ NORCET VITAL: Episiotomy is performed during Crowning at the acme of a uterine contraction when the perineum is thinned out!'
      },
      {
        pageNumber: 9,
        header: 'TOTAL RECALL • VOLUME 2 • OBSTETRICS & MIDWIFERY',
        title: 'Extension, Restitution & External Rotation',
        content: [
          '6. Extension: Fetal head is born by extension as the occiput pivots under the pubic arch. Sequential structures born: Sinciput (forehead), face, and chin.',
          '7. Restitution: Once the head is born, it rotates 1/8th of a circle (45 degrees) in the direction opposite to internal rotation to restore normal alignment with the fetal shoulders.',
          '8. External Rotation: As the shoulders rotate internally inside the pelvis to align with the AP diameter of the outlet, the head externally rotates an additional 45 degrees outside.',
          '9. Expulsion: Anterior shoulder delivers first under the symphysis pubis with gentle downward traction, followed by the posterior shoulder over the perineum with gentle upward traction.'
        ],
        keyPoints: [
          'Head is born by: EXTENSION.',
          'Anterior shoulder delivers FIRST by downward traction.',
          'Posterior shoulder delivers SECOND by upward traction.'
        ]
      },
      {
        pageNumber: 10,
        header: 'TOTAL RECALL • VOLUME 2 • OBSTETRICS & MIDWIFERY',
        title: 'Active Management of Third Stage of Labour (AMTSL)',
        content: [
          'AMTSL drastically reduces the risk of Postpartum Hemorrhage (PPH). Recommended protocol by WHO and Federation of Obstetric & Gynecological Societies of India (FOGSI):',
          '1. Administration of Uterotonic Drug: Oxytocin (10 IU intramuscularly) within 1 minute of delivery of the baby.',
          '2. Controlled Cord Traction (CCT / Brandt-Andrews maneuver) with counter-traction to deliver the placenta.',
          '3. Uterine Massage immediately after delivery of placenta and every 15 minutes for the first 2 hours.'
        ],
        keyPoints: [
          'Drug of choice in AMTSL: Oxytocin 10 IU IM.',
          'Brandt-Andrews maneuver = Counter-pressure on lower uterine segment while exerting gentle traction on cord.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-lab-1',
        question: 'By which cardinal movement is the fetal head born in a normal vertex presentation?',
        options: ['Flexion', 'Extension', 'Restitution', 'Internal rotation'],
        answer: 'B',
        explanation: 'In normal vertex presentation, the fetal head is born over the perineum by Extension, pivoting beneath the symphysis pubis.'
      },
      {
        id: 'q-lab-2',
        question: 'When is episiotomy ideally performed during the second stage of labour?',
        options: [
          'When the cervix is 8 cm dilated',
          'At the onset of full cervical dilation',
          'At the time of crowning when the perineum is stretched thin',
          'Immediately after delivery of the anterior shoulder'
        ],
        answer: 'C',
        explanation: 'Episiotomy is performed when crowning takes place (3-4 cm of presenting head visible at introitus during contractions) to avoid uncontrolled perineal tears.'
      },
      {
        id: 'q-lab-3',
        question: 'Which of the following describes the first component of Active Management of Third Stage of Labour (AMTSL)?',
        options: [
          'Manual removal of placenta within 5 minutes',
          'Administration of 10 IU Oxytocin IM within 1 minute of baby’s birth',
          'Vigorous fundal pressure without cord clamping',
          'Application of ice packs on maternal lower abdomen'
        ],
        answer: 'B',
        explanation: 'WHO/FOGSI AMTSL guidelines require administration of 10 IU Oxytocin IM within 1 minute of child birth, followed by controlled cord traction and uterine massage.'
      }
    ]
  },
  {
    id: 'ch-vitals',
    title: 'Vital Signs (Temperature, Fever, Pulse)',
    subtitle: 'Thermoregulation, Fever Types, Pulse Points, Deficit & Korotkoff Sounds',
    unit: 'Fundamentals of Nursing Volume 1',
    pageRange: 'Pages 11 – 15',
    pages: [
      {
        pageNumber: 11,
        header: 'TOTAL RECALL • VOLUME 1 • FUNDAMENTALS OF NURSING',
        title: 'Core Temperature & Hypothalamic Regulation',
        content: [
          'Body temperature reflects the balance between heat production (thermogenesis) and heat loss (thermolysis). The body’s primary thermostat is located in the Hypothalamus:',
          '• Anterior Hypothalamus: Regulates heat loss (vasodilation, sweating).',
          '• Posterior Hypothalamus: Regulates heat production & conservation (shivering, vasoconstriction).',
          'Normal adult oral temperature: 98.6°F (37.0°C). Rectal temperature is 1°F (0.5°C) higher than oral; Axillary temperature is 1°F (0.5°C) lower than oral.'
        ],
        keyPoints: [
          'Rectal temp = Most accurate reflection of core body temperature.',
          'Contraindication to rectal temperature: Cardiac patients (vagal stimulation causes bradycardia), neutropenic patients, thrombocytopenia, rectal surgery.'
        ]
      },
      {
        pageNumber: 12,
        header: 'TOTAL RECALL • VOLUME 1 • FUNDAMENTALS OF NURSING',
        title: 'Classification & Clinical Patterns of Fever (Pyrexia)',
        content: [
          'Fever patterns are classified based on temperature fluctuations within a 24-hour cycle:',
          '1. Constant / Continuous Fever: Fluctuates less than 1°C (1.5°F) within 24 hours and never touches normal baseline (e.g. Typhoid fever step-ladder pattern, Lobar pneumonia).',
          '2. Remittent Fever: Fluctuates more than 2°C (3.6°F) within 24 hours, but never returns to normal baseline (e.g. Infective endocarditis, Sepsis).',
          '3. Intermittent Fever: Temperature spikes above normal and periodically drops back to normal or subnormal levels within 24-hour intervals (e.g. Malaria, Pyelonephritis).',
          '• Quotidian: Daily spike (every 24 hrs).',
          '• Tertian: Spikes every 48 hrs (Plasmodium vivax / falciparum).',
          '• Quartan: Spikes every 72 hrs (Plasmodium malariae).'
        ],
        keyPoints: [
          'Continuous: Fluctuation < 1°C, doesn’t touch normal.',
          'Remittent: Fluctuation > 2°C, doesn’t touch normal.',
          'Intermittent: Spikes and returns to normal periodically.'
        ]
      },
      {
        pageNumber: 13,
        header: 'TOTAL RECALL • VOLUME 1 • FUNDAMENTALS OF NURSING',
        title: 'Pulse Characteristics & Assessment Sites',
        content: [
          'Pulse is the palpable rhythmic expansion of an artery generated by ventricular contraction ejecting blood into the arterial tree.',
          'Key Parameters:',
          '• Rate: Normal adult pulse = 60–100 beats per minute. Tachycardia > 100 bpm; Bradycardia < 60 bpm.',
          '• Rhythm: Regularity of beats. Dysrhythmia denotes irregular intervals.',
          '• Volume (Amplitude): Reflects stroke volume. Pulse scale: 0 = Absent, 1+ = Weak/thready, 2+ = Normal, 3+ = Full/bounding, 4+ = Hyperdynamic.',
          'Primary Sites: Radial (routine), Carotid (CPR in adults), Brachial (infants CPR, BP measurement), Femoral (cardiac arrest / shock), Apical (PMI at 5th intercostal space left midclavicular line).'
        ],
        keyPoints: [
          'Carotid artery = Primary site for CPR pulse assessment in adults (palpate for 5–10 seconds max).',
          'Brachial artery = Primary site for CPR pulse assessment in infants.'
        ]
      },
      {
        pageNumber: 14,
        header: 'TOTAL RECALL • VOLUME 1 • FUNDAMENTALS OF NURSING',
        title: 'Apical-Radial Pulse Deficit & Special Pulses',
        content: [
          'Pulse Deficit: A discrepancy between the apical heart rate and peripheral radial pulse rate, calculated by two nurses measuring simultaneously for 1 full minute.',
          '• Apical Rate minus Radial Rate = Pulse Deficit.',
          '• Indicates inefficient myocardial contraction failing to transmit a peripheral pulse wave, commonly seen in Atrial Fibrillation.',
          'Special Pulse Phenomena:',
          '• Pulsus Paradoxus: An abnormal drop in systolic BP > 10 mmHg during normal inspiration (hallmark of Cardiac Tamponade).',
          '• Pulsus Alternans: Alternating strong and weak beats with regular rhythm (indicates Severe Left Ventricular Heart Failure).',
          '• Water-Hammer (Corrigan’s) Pulse: Rapid jerky upstroke followed by rapid collapse (Aortic Regurgitation).'
        ],
        clinicalAlert: '⚡ RAPID MEMORY BULLET: Pulse Deficit = Apical - Radial. The apical pulse can never be lower than the radial pulse!'
      },
      {
        pageNumber: 15,
        header: 'TOTAL RECALL • VOLUME 1 • FUNDAMENTALS OF NURSING',
        title: 'Blood Pressure & Korotkoff Sound Phases',
        content: [
          'Blood pressure is the lateral pressure exerted by circulating blood upon arterial walls.',
          'Five Phases of Korotkoff Sounds:',
          '• Phase I: First faint, clear tapping sound heard as cuff deflates = Systolic Blood Pressure.',
          '• Phase II: Murmuring or swishing sound due to turbulent blood flow through narrowing lumen.',
          '• Phase III: Crisper, louder tapping sound.',
          '• Phase IV: Distinct abrupt muffling of sound (diastolic pressure in children / high cardiac output).',
          '• Phase V: Complete cessation of sounds = Diastolic Blood Pressure in adults.'
        ],
        keyPoints: [
          'Cuff bladder size rule: Width should equal 40% of arm circumference; length should encircle 80% of arm.',
          'Cuff too narrow/small -> Falsely High BP reading.',
          'Cuff too wide/large -> Falsely Low BP reading.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-vit-1',
        question: 'Which fever pattern is characterized by daily temperature fluctuations exceeding 2°C without ever touching the normal baseline?',
        options: ['Continuous fever', 'Remittent fever', 'Intermittent fever', 'Relapsing fever'],
        answer: 'B',
        explanation: 'Remittent fever fluctuates more than 2°C (3.6°F) over a 24-hour period but does not reach baseline normal. Continuous fever varies by less than 1°C; intermittent fever reaches baseline regularly.'
      },
      {
        id: 'q-vit-2',
        question: 'A nurse takes blood pressure using a cuff whose bladder is too narrow for an obese patient’s arm. What is the expected error?',
        options: ['Falsely low systolic and diastolic reading', 'Falsely elevated blood pressure reading', 'No alteration in measurement', 'Inaudible Korotkoff sounds'],
        answer: 'B',
        explanation: 'A BP cuff that is too small or narrow produces a falsely elevated reading because excessive bladder pressure is needed to occlude the underlying brachial artery.'
      },
      {
        id: 'q-vit-3',
        question: 'Pulsus paradoxus (systolic pressure dropping >10 mmHg on inspiration) is a classic finding in which emergency condition?',
        options: ['Cardiac tamponade', 'Pulmonary embolism', 'Left ventricular hypertrophy', 'Hypertrophic cardiomyopathy'],
        answer: 'A',
        explanation: 'Pulsus paradoxus is an exaggeration of the normal respiratory variation in systolic blood pressure, classically diagnostic of Cardiac Tamponade alongside Beck’s triad.'
      }
    ]
  },
  {
    id: 'ch-procedures',
    title: 'Three Essential Nursing Procedures',
    subtitle: 'Oxygen Therapy, Nasogastric Tube Feeding & Urinary Catheterisation',
    unit: 'Fundamentals of Nursing Volume 1',
    pageRange: 'Pages 16 – 20',
    pages: [
      {
        pageNumber: 16,
        header: 'TOTAL RECALL • VOLUME 1 • NURSING PROCEDURES',
        title: 'Procedure 1: Oxygen Therapy Delivery Devices',
        content: [
          'Oxygen is prescribed as a pharmacological medication. Oxygen devices are grouped into Low-Flow and High-Flow systems.',
          '1. Nasal Cannula (Prong): Flow 1–6 L/min, delivers FiO2 24%–44% (approx. 4% increase per 1 L/min). Flow > 4 L/min requires humidification.',
          '2. Simple Face Mask: Flow 5–8 L/min, delivers FiO2 40%–60%. Minimum 5 L/min required to prevent rebreathing of CO2.',
          '3. Non-Rebreathing Mask (NRBM): High-concentration reservoir bag with one-way valves. Flow 10–15 L/min, delivers FiO2 80%–95%. Keep reservoir bag 2/3 full.',
          '4. Venturi Mask: High-flow system providing precise, guaranteed FiO2 (24%–50%) regardless of patient breathing pattern. Device of choice for COPD / emphysema patients with chronic hypercapnia.'
        ],
        keyPoints: [
          'Device of choice in COPD: Venturi Mask (prevents ablation of hypoxic respiratory drive).',
          'NRBM gives highest FiO2 among non-invasive masks (up to 95%).'
        ]
      },
      {
        pageNumber: 17,
        header: 'TOTAL RECALL • VOLUME 1 • NURSING PROCEDURES',
        title: 'Procedure 2: Nasogastric Tube (NGT) Insertion & Measurement',
        content: [
          'Nasogastric tube insertion is performed for decompression (paralytic ileus, bowel obstruction), enteral feeding, or gastric lavage.',
          '• Measurement technique (NEX): Tip of the Nose -> Ear lobe -> Xiphoid process.',
          '• Insertion Position: High-Fowler position with head tilted slightly back initially, then flex neck forward and instruct patient to swallow sips of water as tube reaches posterior pharynx.',
          'Verification of tube placement (Golden Rules):',
          '• Gold Standard: Abdominal X-ray (radiographic confirmation) before initial use.',
          '• Bedside method: Aspirate gastric contents and test pH with indicator strip (Gastric pH is acidic < 5.5; Respiratory/intestinal aspirate pH > 6.0).'
        ],
        clinicalAlert: '⚠️ EXAM WARNING: The traditional auscultation method (air bolus whoosh) is NO LONGER considered reliable by current international nursing standards! pH testing (<5.5) and X-ray are required.'
      },
      {
        pageNumber: 18,
        header: 'TOTAL RECALL • VOLUME 1 • NURSING PROCEDURES',
        title: 'Enteral Feeding Administration & Residual Volume Check',
        content: [
          'Before administering bolus or continuous enteral feeding via NGT:',
          '1. Position client in Semi-Fowler to High-Fowler (30–45 degrees minimum) during feeding and maintain for 30–60 minutes post-feeding to prevent aspiration.',
          '2. Check Gastric Residual Volume (GRV): Aspirate stomach contents using 50–60 mL catheter-tip syringe. If GRV exceeds 250–500 mL (or institution policy), withhold feeding and notify physician.',
          '3. Return the aspirate into the stomach (unless contraindicated) to prevent fluid, electrolyte, and acid-base disturbances.',
          '4. Flush tube with 30 mL sterile water before and after feeding and between medications.'
        ],
        keyPoints: [
          'Prevent aspiration: Keep head of bed elevated 30–45 degrees.',
          'Always return aspirated gastric juice to avoid metabolic alkalosis / electrolyte depletion.'
        ]
      },
      {
        pageNumber: 19,
        header: 'TOTAL RECALL • VOLUME 1 • NURSING PROCEDURES',
        title: 'Procedure 3: Indwelling Urinary Catheterisation Principles',
        content: [
          'Urinary catheterisation involves aseptic insertion of a flexible catheter into the bladder via the urethra.',
          'Catheter Sizing (French Scale, where 1 Fr = 0.33 mm):',
          '• Adult Females: 14–16 Fr.',
          '• Adult Males: 16–18 Fr.',
          '• Children: 8–10 Fr.',
          'Catheter balloon inflation: Use sterile distilled water ONLY! Never use normal saline (crystallizes and jams balloon valve) or air (floats and distorts bladder neck). Balloon capacity typically 10 mL.',
          'Insertion length:',
          '• Female: Insert 5–7.5 cm (2–3 inches) until urine flashback, then advance further 2.5–5 cm before inflating balloon.',
          '• Male: Hold penis at 90-degree angle; insert 17–22 cm (7–9 inches) until urine flows, advance to catheter bifurcation (Y-junction) before inflating balloon.'
        ],
        keyPoints: [
          'Inflate balloon with: STERILE WATER ONLY (not normal saline!).',
          'In males, advance up to the bifurcation to prevent urethral rupture from balloon inflation in the prostatic urethra.'
        ]
      },
      {
        pageNumber: 20,
        header: 'TOTAL RECALL • VOLUME 1 • NURSING PROCEDURES',
        title: 'Prevention of Catheter-Associated UTI (CAUTI)',
        content: [
          'Catheter-Associated Urinary Tract Infection (CAUTI) is the most frequent hospital-acquired infection. Evidence-based prevention bundled practices:',
          '1. Maintain an uninterrupted sterile closed drainage system.',
          '2. Keep drainage bag continuously BELOW the level of the bladder to prevent retrograde urine reflux.',
          '3. Ensure unobstructed downward urine flow without dependent loops or kinks in tubing.',
          '4. Secure catheter to anterolateral thigh (females) or lower abdomen / upper thigh (males) to minimize urethral traction.',
          '5. Perform daily perineal hygiene with plain soap and water (antiseptic ointments around meatus are not recommended).'
        ],
        keyPoints: [
          'Urine bag must ALWAYS be below bladder level.',
          'Never place urine bag on the floor.',
          'Remove catheter at earliest clinically indicated time!'
        ]
      }
    ],
    questions: [
      {
        id: 'q-proc-1',
        question: 'Which oxygen administration device delivers a precise and consistent concentration of oxygen (FiO2) regardless of the client’s respiratory pattern?',
        options: ['Nasal cannula', 'Simple face mask', 'Venturi mask', 'Partial rebreather mask'],
        answer: 'C',
        explanation: 'A Venturi mask uses color-coded entrainment adapters to blend room air with oxygen, delivering exact, fixed FiO2. It is indicated for COPD patients to avoid blunting hypoxic drive.'
      },
      {
        id: 'q-proc-2',
        question: 'Which liquid should be used to inflate the retention balloon of a Foley catheter?',
        options: ['Normal saline 0.9%', 'Sterile water', 'Sterile air', 'Dextrose 5% solution'],
        answer: 'B',
        explanation: 'Sterile water is strictly recommended. Normal saline can precipitate crystals that clog the inflation channel, impeding balloon deflation during catheter removal.'
      },
      {
        id: 'q-proc-3',
        question: 'What is the gold standard method to verify correct initial positioning of a newly inserted nasogastric tube?',
        options: ['Aspirating gastric juice and checking pH', 'Auscultating air bolus over the epigastrium', 'Radiographic confirmation via chest/abdominal X-ray', 'Placing tube tip in water to look for bubbles'],
        answer: 'C',
        explanation: 'Radiographic confirmation (X-ray) remains the gold standard to verify NG tube tip placement prior to enteral feeds or drug administration.'
      }
    ]
  },
  {
    id: 'ch-pediatric',
    title: 'Growth and Development in Children',
    subtitle: 'Developmental Milestones, Theories (Piaget, Erikson), Reflexes & Dentition',
    unit: 'Pediatric & Child Health Nursing Volume 2',
    pageRange: 'Pages 21 – 24',
    pages: [
      {
        pageNumber: 21,
        header: 'TOTAL RECALL • VOLUME 2 • PEDIATRIC NURSING',
        title: 'Principles of Growth & Physical Assessment Milestones',
        content: [
          'Growth represents quantitative physical enlargement (height, weight); Development denotes qualitative progression in neuromuscular capacity and functional skills.',
          'Cardinal Laws:',
          '• Cephalocaudal: Head-to-toe progression (head control before walking).',
          '• Proximodistal: Central axis outward to periphery (gross arm motor before fine pincer grasp).',
          'Infant Weight Milestones:',
          '• Birth weight doubles by: 5 to 6 months of age.',
          '• Birth weight triples by: 1 year (12 months).',
          '• Birth weight quadruples by: 2 years (24 months).',
          'Height / Length Milestones:',
          '• Average birth length: 50 cm.',
          '• At 1 year: 75 cm (increases by 50%).',
          '• Birth length doubles by: 4 years (100 cm).'
        ],
        keyPoints: [
          'Birth weight doubles = 5–6 months; triples = 1 year; quadruples = 2 years.',
          'Birth length doubles = 4 years (100 cm).'
        ]
      },
      {
        pageNumber: 22,
        header: 'TOTAL RECALL • VOLUME 2 • PEDIATRIC NURSING',
        title: 'Gross & Fine Motor Developmental Milestones Timeline',
        content: [
          'Key Age-Specific Milestones Tested in NORCET / Nursing Exams:',
          '• 3 Months: Holds head steady with no head lag; smiles socially.',
          '• 5 Months: Rolls from abdomen to back.',
          '• 6 Months: Rolls from back to abdomen; sits with support; transfers objects hand-to-hand.',
          '• 8 Months: Sits without support; stranger anxiety develops.',
          '• 9 Months: Crawls/creeps; crude pincer grasp (thumb and fingers).',
          '• 10 Months: Waves "bye-bye" and plays peek-a-boo.',
          '• 12 Months: Fine pincer grasp (thumb and index fingertip); stands alone; speaks 2–3 words.',
          '• 15 Months: Walks independently without help; builds tower of 2 blocks.',
          '• 18 Months: Runs clumsily; climbs stairs holding hand; builds tower of 3–4 cubes.',
          '• 24 Months (2 years): Runs well; climbs stairs 2 feet per step; builds tower of 6 cubes.'
        ],
        keyPoints: [
          'Social smile = 2 months.',
          'Sits without support = 8 months.',
          'Fine pincer grasp = 12 months.',
          'Tower of 6 cubes = 2 years (Age in years × 3 rule of thumb).'
        ]
      },
      {
        pageNumber: 23,
        header: 'TOTAL RECALL • VOLUME 2 • PEDIATRIC NURSING',
        title: 'Primitive Infant Reflexes & Disappearance Timetable',
        content: [
          'Inborn neurological reflexes present at birth indicate intact brainstem function and normally disappear as cerebral cortex matures:',
          '1. Moro (Startle) Reflex: Sudden loss of support causes symmetric abduction and extension of arms with fanning of fingers, followed by adduction ("embrace"). Disappears by 3–4 months. (Persistence > 6 months suggests cerebral palsy).',
          '2. Rooting & Sucking Reflex: Stroking cheek turns infant head toward stimulus to latch. Disappears by 3–4 months.',
          '3. Tonic Neck ("Fencing") Reflex: Turning head to one side causes extension of extremities on that side and flexion on opposite side. Disappears by 4–6 months.',
          '4. Babinski Reflex: Stroking lateral sole from heel upward causes dorsiflexion of great toe and fanning of other toes. Normal in infants up to 12–18 months; abnormal / sign of UMN lesion in adults.'
        ],
        clinicalAlert: '⚠️ NORCET BULLET: Asymmetrical Moro reflex points to Clavicle Fracture or Brachial Plexus Injury (Erb’s palsy) during difficult delivery!'
      },
      {
        pageNumber: 24,
        header: 'TOTAL RECALL • VOLUME 2 • PEDIATRIC NURSING',
        title: 'Psychosocial (Erikson) & Cognitive (Piaget) Stages',
        content: [
          'Erik Erikson Psychosocial Stages:',
          '• Infancy (0–1 yr): Trust vs Mistrust (Virtue: Hope).',
          '• Toddler (1–3 yr): Autonomy vs Shame & Doubt (Virtue: Will).',
          '• Preschooler (3–6 yr): Initiative vs Guilt (Virtue: Purpose).',
          '• School-age (6–12 yr): Industry vs Inferiority (Virtue: Competence).',
          '• Adolescent (12–18 yr): Identity vs Role Confusion (Virtue: Fidelity).',
          'Jean Piaget Cognitive Development:',
          '• Sensorimotor (0–2 yr): Object permanence develops around 8–9 months.',
          '• Preoperational (2–7 yr): Egocentrism, animism, magical thinking.',
          '• Concrete Operational (7–11 yr): Concept of conservation, reversibility.',
          '• Formal Operational (11+ yr): Abstract reasoning, hypothetical deductive logic.'
        ],
        keyPoints: [
          'Toddler hallmark: Negativism and ritualism (Autonomy vs Shame).',
          'Object permanence = Realizing an object still exists even when hidden from view.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-ped-1',
        question: 'At what age is a healthy infant expected to double their birth weight?',
        options: ['2 to 3 months', '5 to 6 months', '9 to 10 months', '12 months'],
        answer: 'B',
        explanation: 'A healthy infant doubles their birth weight by 5 to 6 months and triples their birth weight by 1 year of age.'
      },
      {
        id: 'q-ped-2',
        question: 'An asymmetrical Moro reflex in a newborn immediately following birth is most indicative of which condition?',
        options: ['Hydrocephalus', 'Fractured clavicle or Erb’s palsy', 'Down syndrome', 'Hypoglycemia'],
        answer: 'B',
        explanation: 'An asymmetrical Moro reflex implies localized injury to one side, commonly a fractured clavicle or brachial plexus injury (Erb’s palsy).'
      },
      {
        id: 'q-ped-3',
        question: 'According to Erik Erikson, which psychosocial conflict is experienced during the toddler stage (1 to 3 years)?',
        options: ['Trust vs Mistrust', 'Autonomy vs Shame and Doubt', 'Initiative vs Guilt', 'Industry vs Inferiority'],
        answer: 'B',
        explanation: 'Toddlers (1–3 years) navigate Autonomy vs Shame and Doubt, striving for self-control, independence, and bodily mastery.'
      }
    ]
  },
  {
    id: 'ch-ancient-gk',
    title: 'General Knowledge: Ancient India',
    subtitle: 'Harappan Civilization, Vedic Literature, Buddhism, Jainism & Maurya Empire',
    unit: 'Non-Nursing General Aptitude Volume 2',
    pageRange: 'Pages 25 – 28',
    pages: [
      {
        pageNumber: 25,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING APTITUDE',
        title: 'Indus Valley (Harappan) Civilization (2500–1750 BCE)',
        content: [
          'The Indus Valley Civilization was a Bronze Age urban civilization characterized by sophisticated town planning, grid street layout, and advanced drainage systems.',
          'Key Archaeological Sites & Discoveries:',
          '• Harappa (Ravi River, Punjab): Excavated by Daya Ram Sahni (1921). Granaries, terracotta figurines.',
          '• Mohenjo-daro ("Mound of the Dead", Indus River, Sindh): Excavated by R.D. Banerjee (1922). Great Bath, Great Granary, Bronze Dancing Girl, Pashupati seal.',
          '• Lothal (Bhogava River, Gujarat): World’s earliest artificial naval dockyard, port town, rice husk evidence.',
          '• Kalibangan (Ghaggar River, Rajasthan): Ploughed field surface, fire altars.',
          '• Dholavira (Kutch, Gujarat): Unique tripartite city plan, sophisticated water reservoirs, UNESCO World Heritage site.'
        ],
        keyPoints: [
          'Great Bath & Bronze Dancing Girl = Mohenjo-daro.',
          'First tidal dockyard = Lothal (Gujarat).',
          'Metal unknown to Harappans = Iron (they used bronze, copper, gold, silver).'
        ]
      },
      {
        pageNumber: 26,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING APTITUDE',
        title: 'Vedic Age & Literature (1500–600 BCE)',
        content: [
          'The Vedic Age is divided into the Early Vedic (Rigvedic) and Later Vedic periods.',
          'The Four Vedas:',
          '1. Rigveda: Oldest sacred text in the world (contains 1,028 hymns in 10 Mandalas). The famous Gayatri Mantra is in Mandala 3, dedicated to solar deity Savitr.',
          '2. Samaveda: "Veda of Chants" – foundational root of Indian classical music.',
          '3. Yajurveda: Prose mantras and sacrificial rituals (divided into Shukla and Krishna Yajurveda).',
          '4. Atharvaveda: Charms, healing incantations, magical formulas, and roots of Ayurveda medicine.',
          'National Motto: "Satyameva Jayate" (Truth alone triumphs) is inscribed on our National Emblem, taken from the Mundaka Upanishad.'
        ],
        keyPoints: [
          'Oldest Veda = Rigveda.',
          'Satyameva Jayate source = Mundaka Upanishad.',
          'Roots of Ayurveda = Atharvaveda.'
        ]
      },
      {
        pageNumber: 27,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING APTITUDE',
        title: 'Buddhism & Jainism High-Yield Highlights',
        content: [
          'Gautama Buddha (Siddhartha Gautama, 563–483 BCE):',
          '• Birth: Lumbini (Nepal) under Sal tree.',
          '• Enlightenment (Nirvana): Bodh Gaya (Bihar) under the Bodhi tree (Peepal).',
          '• First Sermon (Dharmachakrapravartana): Sarnath (Deer Park near Varanasi).',
          '• Mahaparinirvana (Death): Kushinagar (UP).',
          'Buddhist Councils:',
          '1. Rajgriha (483 BCE, King Ajatashatru).',
          '2. Vaishali (383 BCE, King Kalashoka).',
          '3. Pataliputra (250 BCE, King Ashoka).',
          '4. Kundalvana, Kashmir (72 CE, King Kanishka - Division into Hinayana and Mahayana).',
          'Vardhamana Mahavira (24th Tirthankara of Jainism): Born at Kundagrama, Vaishali; attained Kevalajnana under Sal tree; died at Pavapuri.'
        ],
        keyPoints: [
          'Buddha’s first sermon = Sarnath.',
          'Division into Hinayana/Mahayana = 4th Council in Kashmir under Kanishka.'
        ]
      },
      {
        pageNumber: 28,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING APTITUDE',
        title: 'Mauryan Empire & Ashoka the Great (322–185 BCE)',
        content: [
          'Founded by Chandragupta Maurya with guidance of Chanakya (Kautilya / Vishnugupta), author of "Arthashastra" on statecraft and economics.',
          '• Megasthenes: Greek ambassador sent by Seleucus Nicator, authored "Indica".',
          'Emperor Ashoka (268–232 BCE):',
          '• Kalinga War (261 BCE): Described vividly in Major Rock Edict XIII. Deep remorse over bloodshed led Ashoka to renounce military conquest (Bherighosha) and embrace moral conquest (Dhammaghosha) under Buddhist monk Upagupta.',
          '• Lion Capital at Sarnath: Chosen as the National Emblem of the Republic of India; the 24-spoke Ashoka Chakra adorns the center of the Indian Tricolour.'
        ],
        keyPoints: [
          'Kalinga War described in: Major Rock Edict XIII.',
          'National Emblem adapted from: Ashoka’s Sarnath Lion Capital.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-gk-1',
        question: 'The national motto of India, "Satyameva Jayate", is inscribed beneath the national emblem. From which ancient text is it derived?',
        options: ['Mundaka Upanishad', 'Rigveda', 'Bhagavad Gita', 'Chandogya Upanishad'],
        answer: 'A',
        explanation: '"Satyameva Jayate" is an ancient Sanskrit mantra from the Mundaka Upanishad, meaning "Truth alone triumphs".'
      },
      {
        id: 'q-gk-2',
        question: 'At which Harappan site was an ancient tidal dockyard discovered?',
        options: ['Kalibangan', 'Lothal', 'Mohenjo-daro', 'Dholavira'],
        answer: 'B',
        explanation: 'Lothal in modern Gujarat features the world’s oldest excavated artificial dockyard connected to the ancient Sabarmati river trade.'
      },
      {
        id: 'q-gk-3',
        question: 'Where did Gautama Buddha deliver his first sermon (Dharmachakrapravartana)?',
        options: ['Bodh Gaya', 'Sarnath', 'Lumbini', 'Kushinagar'],
        answer: 'B',
        explanation: 'Buddha delivered his first sermon to his five former companions at the Deer Park in Sarnath, setting the Wheel of Law into motion.'
      }
    ]
  },
  {
    id: 'ch-reasoning',
    title: 'Reasoning: Introduction & Analogy',
    subtitle: 'Verbal Analogy, Number Logic, Letter Coding & Classification for Nursing Exams',
    unit: 'Non-Nursing General Aptitude Volume 2',
    pageRange: 'Pages 29 – 31',
    pages: [
      {
        pageNumber: 29,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING REASONING',
        title: 'Verbal Analogy & Medical Relationships',
        content: [
          'Analogy tests your ability to discern logical relationships between given pairs of terms and apply that exact relation to an incomplete pair: A : B :: C : ?',
          'Common Relationship Types in AIIMS NORCET & ESIC exams:',
          '1. Organ and Specialist: Kidney : Nephrologist :: Eye : Ophthalmologist.',
          '2. Organ and Diagnostic Tool: Heart : Electrocardiogram (ECG) :: Brain : Electroencephalogram (EEG).',
          '3. Disease and Causative Pathogen: Cholera : Vibrio cholerae :: Typhoid : Salmonella typhi.',
          '4. Deficiency and Disorder: Vitamin D : Rickets :: Vitamin C : Scurvy.',
          '5. Drug and Antidote: Heparin : Protamine Sulfate :: Warfarin : Vitamin K.'
        ],
        keyPoints: [
          'Identify relationship rule first: function, part-to-whole, cause-and-effect, or antonym/synonym.'
        ]
      },
      {
        pageNumber: 30,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING REASONING',
        title: 'Numerical & Alphabetic Analogy Patterns',
        content: [
          'Numerical Analogy Principles:',
          '• Square & Cube Patterns: 5 : 25 :: 7 : 49 or 3 : 27 :: 4 : 64.',
          '• Multiplicative Offset: x : (x * n + k). Example: 7 : 50 (7² + 1) :: 9 : 82 (9² + 1).',
          'Letter Series & Reverse Alphabet Position Formula:',
          '• E-J-O-T-Y Rule: Positions 5, 10, 15, 20, 25.',
          '• Reverse pair sum equals 27: A(1) + Z(26) = 27; B(2) + Y(25) = 27; M(13) + N(14) = 27.'
        ],
        keyPoints: [
          'Sum of opposite letter positions is always 27.',
          'Always check prime numbers, squares, and cubes before complex arithmetic.'
        ]
      },
      {
        pageNumber: 31,
        header: 'TOTAL RECALL • VOLUME 2 • NON-NURSING REASONING',
        title: 'Coding-Decoding & Blood Relations Speed Formulas',
        content: [
          'Blood Relation Family Tree Symbols:',
          '• Horizontal line (-) = Brother/Sister sibling bond.',
          '• Double horizontal line (=) = Married couple.',
          '• Vertical line (|) = Generation gap (Father/Mother to Son/Daughter).',
          '• (+) = Male; (-) = Female.',
          'Speed Tip for Nursing Officer Exam Candidates: Always sketch the family tree starting from the "My" reference point in indirect statement puzzles.'
        ],
        keyPoints: [
          'Break complex relation puzzles down by mapping generation levels.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-reas-1',
        question: 'Heparin : Protamine Sulfate :: Warfarin : ?',
        options: ['Vitamin C', 'Vitamin K', 'Calcium Gluconate', 'Naloxone'],
        answer: 'B',
        explanation: 'The relationship is Drug : Specific Antidote. The antidote for Heparin is Protamine Sulfate; the specific antidote for Warfarin is Vitamin K (Phytonadione).'
      },
      {
        id: 'q-reas-2',
        question: 'ECG : Heart :: EEG : ?',
        options: ['Lungs', 'Kidneys', 'Brain', 'Liver'],
        answer: 'C',
        explanation: 'ECG records electrical activity of the heart; EEG (Electroencephalography) records electrical activity of the brain.'
      },
      {
        id: 'q-reas-3',
        question: 'Find the missing number in the analogy: 8 : 64 :: 11 : ?',
        options: ['110', '121', '132', '144'],
        answer: 'B',
        explanation: 'The pattern is x : x². Here 8² = 64, so for 11, the answer is 11² = 121.'
      }
    ]
  }
];

export const INITIAL_DAILY_NOTES: DailyNote[] = [
  {
    id: 'note-1',
    title: 'Glasgow Coma Scale (GCS): Rapid Assessment & The E4 V5 M6 Rule',
    date: '2026-10-07',
    subject: 'Emergency & Neurological Nursing',
    readTime: '3 min read',
    isGolden: true,
    tags: ['GCS', 'Neuro', 'ICU', 'NORCET-Must'],
    content: `# Glasgow Coma Scale (GCS) Assessment

The Glasgow Coma Scale assesses level of consciousness following acute head trauma. Total score ranges from **3 (deep coma / brain death)** to **15 (fully oriented)**.

## Eye Opening Response (E - Max 4)
- **4** = Spontaneous eye opening
- **3** = To speech / verbal command
- **2** = To pain / noxious peripheral stimulus
- **1** = None (no eye opening)

## Verbal Response (V - Max 5)
- **5** = Oriented and converses normally
- **4** = Disoriented / Confused conversation
- **3** = Inappropriate words (random exclamation)
- **2** = Incomprehensible sounds (moaning/groaning)
- **1** = None (no sounds)
*Note:* If patient is endotracheal intubated, record score as **V1t**.

## Motor Response (M - Max 6)
- **6** = Obeys verbal commands
- **5** = Localizes painful stimulus
- **4** = Normal flexion / withdrawal from pain
- **3** = **Abnormal flexion (Decorticate posturing)** - Damage to cerebral hemispheres / internal capsule
- **2** = **Abnormal extension (Decerebrate posturing)** - Severe brainstem / midbrain injury
- **1** = Flaccid / No motor response

==CRITICAL CLINICAL PEARL: GCS score of 8 or less indicates severe coma ("GCS 8, Intubate!"). Immediate airway protection is mandated!==`
  },
  {
    id: 'note-2',
    title: 'Arterial Blood Gas (ABG) Interpretation: The ROME Method Made Simple',
    date: '2026-10-06',
    subject: 'Medical-Surgical & Critical Care',
    readTime: '4 min read',
    isGolden: true,
    tags: ['ABG', 'Acid-Base', 'Critical Care'],
    content: `# Arterial Blood Gas (ABG) Master Class

Mastering ABG questions requires only three reference values:
- **pH**: 7.35 – 7.45 (< 7.35 = Acidosis, > 7.45 = Alkalosis)
- **PaCO2**: 35 – 45 mmHg (Respiratory parameter)
- **HCO3-**: 22 – 26 mEq/L (Metabolic parameter)

## The R.O.M.E. Rule:
- **R.O.** = **R**espiratory **O**pposite:
  - In respiratory disturbances, pH and PaCO2 move in *opposite* directions.
  - Respiratory Acidosis: pH ↓ and PaCO2 ↑
  - Respiratory Alkalosis: pH ↑ and PaCO2 ↓
- **M.E.** = **M**etabolic **E**qual (Same):
  - In metabolic disturbances, pH and HCO3 move in the *same* direction.
  - Metabolic Acidosis: pH ↓ and HCO3 ↓
  - Metabolic Alkalosis: pH ↑ and HCO3 ↑

## Compensation Checklist:
- **Uncompensated**: Abnormal pH, one component abnormal, other component completely normal.
- **Partially Compensated**: Abnormal pH, but BOTH PaCO2 and HCO3 are abnormal (working to buffer).
- **Fully Compensated**: pH has returned to **normal range (7.35–7.45)**, while both PaCO2 and HCO3 remain abnormal.`
  },
  {
    id: 'note-3',
    title: 'Obstetric Calculations: Naegele’s Rule, Fundal Height & GTPAL',
    date: '2026-10-05',
    subject: 'Obstetrics & Gynaecological Nursing',
    readTime: '3 min read',
    isGolden: true,
    tags: ['EDD', 'GTPAL', 'OBG High Yield'],
    content: `# Key Obstetric Formulas for AIIMS NORCET

## 1. Naegele’s Rule for Expected Date of Delivery (EDD)
**EDD = First day of Last Menstrual Period (LMP) + 9 Calendar Months + 7 Days**  
*(Or LMP + 7 Days - 3 Months + 1 Year)*

==Example: If LMP is January 10, 2026:==
- Add 7 days = January 17
- Add 9 months = October 17, 2026!

## 2. Fundal Height Progression
- **12 Weeks**: Just palpable at the Symphysis Pubis.
- **16 Weeks**: Midway between Symphysis Pubis and Umbilicus.
- **20–22 Weeks**: At the level of the **Umbilicus**.
- **36 Weeks**: At the level of the **Xiphoid Process** (highest level).
- **40 Weeks**: Drops back down to 32-week level due to *Lightening* (engagement).

## 3. GTPAL System:
- **G** = Gravidity (Total number of pregnancies regardless of outcome)
- **T** = Term births (Delivered at ≥ 37 weeks)
- **P** = Preterm births (Delivered between 20 and 36.6 weeks)
- **A** = Abortions / Miscarriages (Loss prior to 20 weeks)
- **L** = Living children currently alive`
  },
  {
    id: 'note-4',
    title: 'Must-Know Antidotes & Emergency Resuscitation Drugs',
    date: '2026-10-04',
    subject: 'Pharmacology',
    readTime: '3 min read',
    isGolden: true,
    tags: ['Pharmacology', 'Antidotes', 'Emergency'],
    content: `# High-Yield Antidote Checklist

| Toxic Substance / Drug | Specific Antidote |
|---|---|
| **Acetaminophen (Paracetamol)** | N-Acetylcysteine (NAC / Mucomyst) |
| **Opioids (Morphine, Fentanyl, Heroin)** | Naloxone (Narcan) |
| **Benzodiazepines (Diazepam, Midazolam)** | Flumazenil (Romazicon) |
| **Heparin** | Protamine Sulfate |
| **Warfarin (Coumadin)** | Vitamin K (Phytonadione) / FFP |
| **Digoxin (Digitalis toxicity)** | Digoxin Immune Fab (DigiFab) |
| **Magnesium Sulfate toxicity** | Calcium Gluconate 10% IV |
| **Iron toxicity** | Deferoxamine |
| **Organophosphate / Insecticide poisoning** | Atropine Sulfate + Pralidoxime (2-PAM) |
| **Cyanide poisoning** | Hydroxocobalamin / Sodium thiosulfate |
| **Beta-Blocker overdose** | Glucagon |
| **Lead poisoning** | Succimer / Calcium disodium EDTA |

==ALERT: In Magnesium toxicity (loss of patellar reflex, respiratory rate < 12/min, urine output < 30 mL/hr), stop MgSO4 immediately and infuse Calcium Gluconate 10% 10 mL IV over 5 minutes!==`
  },
  {
    id: 'note-5',
    title: 'National Immunization Schedule (NIS) 2026 Updates',
    date: '2026-10-03',
    subject: 'Community Health Nursing',
    readTime: '4 min read',
    isGolden: false,
    tags: ['CHN', 'Vaccines', 'NIS'],
    content: `# National Immunization Schedule Highlights

## At Birth:
- **BCG**: 0.05 mL (0.1 mL after 1 month) | Intradermal | Left upper arm | Tuberculin syringe.
- **OPV 0 Dose**: 2 drops | Oral.
- **Hepatitis B birth dose**: 0.5 mL | Intramuscular (IM) | Anterolateral aspect of mid-thigh (within 24 hrs).

## At 6, 10, and 14 Weeks:
- **Pentavalent (DPT + Hep B + Hib)**: 0.5 mL IM | Anterolateral thigh.
- **Rotavirus (RVV)**: 5 drops (liquid) oral.
- **fIPV (Fractional IPV)**: 0.1 mL Intradermal at 6 & 14 weeks | Right upper arm.
- **PCV (Pneumococcal)**: 0.5 mL IM at 6 & 14 weeks (Booster at 9 months).

## At 9–12 Months:
- **MR 1st dose (Measles-Rubella)**: 0.5 mL Subcutaneous (SC) | Right upper arm.
- **Vitamin A 1st dose**: 1 Lakh IU (1 mL) | Oral.
- **JE (Japanese Encephalitis 1)** in endemic districts: 0.5 mL SC.`
  }
];

export const INITIAL_SUBJECT_QUIZZES: SubjectQuiz[] = [
  {
    id: 'subj-gi',
    title: 'Digestive & Gastrointestinal Nursing',
    icon: 'UtensilsCrossed',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Peptic Ulcer', 'Appendicitis', 'Liver Cirrhosis', 'Pancreatitis', 'Hirschsprung Disease'],
    questions: [
      {
        id: 'sq-gi-1',
        question: 'Which of the following is the hallmark clinical sign of Acute Appendicitis?',
        options: [
          'Pain starting in the right iliac fossa immediately radiating to back',
          'Pain starting periumbilically and shifting to McBurney’s point with localized rebound tenderness',
          'Left upper quadrant pain relieved by eating fatty foods',
          'Severe colicky pain relieved by lying flat on the back'
        ],
        answer: 'B',
        explanation: 'Acute appendicitis classically presents with periumbilical visceral pain that shifts within 4-12 hours to the right lower quadrant (McBurney’s point), associated with Rovsing’s sign and rebound tenderness.'
      },
      {
        id: 'sq-gi-2',
        question: 'A nurse assesses a patient with liver cirrhosis exhibiting asterixis (flapping tremor) and confusion. Which lab parameter is elevated?',
        options: ['Serum amylase', 'Blood urea nitrogen', 'Serum ammonia', 'Serum alkaline phosphatase'],
        answer: 'C',
        explanation: 'Hepatic encephalopathy is caused by impaired hepatic clearance of ammonia produced by gut bacteria. Elevated serum ammonia crosses the blood-brain barrier causing flapping tremor (asterixis) and altered mental status.'
      },
      {
        id: 'sq-gi-3',
        question: 'Which position is recommended for a client undergoing paracentesis for severe ascites?',
        options: ['Prone position with pillow under pelvis', 'Upright High-Fowler position seated at bedside with feet supported', 'Trendelenburg position', 'Left Sims lateral with knees tightly drawn'],
        answer: 'B',
        explanation: 'For paracentesis, an upright High-Fowler position allows peritoneal fluid to accumulate in the lower abdomen by gravity and keeps loops of bowel away from the trocar entry point.'
      },
      {
        id: 'sq-gi-4',
        question: 'What is the characteristic stool appearance in a child diagnosed with Intussusception?',
        options: ['Ribbon-like pencil thin stools', 'Currant jelly stools (blood and mucus)', 'Bulky, frothy, foul-smelling stools', 'Clay-colored pale stools'],
        answer: 'B',
        explanation: 'Intussusception (invagination of bowel segment) impairs venous drainage, leading to mucosal sloughing, blood and mucus discharge termed "currant jelly stools".'
      },
      {
        id: 'sq-gi-5',
        question: 'Cullen’s sign (bluish periumbilical discoloration) and Grey Turner’s sign (flank ecchymosis) indicate which severe disorder?',
        options: ['Acute necrotizing pancreatitis with retroperitoneal hemorrhage', 'Perforated gallbladder', 'Small bowel strangulation', 'Bleeding duodenal ulcer'],
        answer: 'A',
        explanation: 'Both Cullen’s sign (periumbilical bruising) and Grey Turner’s sign (flank bruising) result from retroperitoneal extravasation of blood in acute hemorrhagic/necrotizing pancreatitis.'
      }
    ]
  },
  {
    id: 'subj-obg',
    title: 'Obstetrics & Gynaecological Nursing (OBG)',
    icon: 'Baby',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Mechanism of Labour', 'PPH', 'Preeclampsia', 'Ectopic Pregnancy', 'Lochia'],
    questions: [
      {
        id: 'sq-obg-1',
        question: 'What is the drug of choice for the prevention and management of seizures in Severe Preeclampsia and Eclampsia?',
        options: ['Phenytoin sodium', 'Diazepam', 'Magnesium Sulfate', 'Sodium valproate'],
        answer: 'C',
        explanation: 'Magnesium Sulfate (Pritchard or Zuspan regimen) is the undisputed international drug of choice to prevent and treat eclamptic convulsions.'
      },
      {
        id: 'sq-obg-2',
        question: 'Painless, bright-red vaginal bleeding occurring during the third trimester of pregnancy is classic for:',
        options: ['Abruptio placentae', 'Placenta previa', 'Hydatidiform mole', 'Uterine rupture'],
        answer: 'B',
        explanation: 'Placenta previa classically presents with sudden, painless, causeless, recurrent bright red vaginal bleeding in the 3rd trimester. Abruptio placentae is characterized by painful dark bleeding with rigid woody uterus.'
      },
      {
        id: 'sq-obg-3',
        question: 'Which assessment finding requires immediate withholding of the next dose of Magnesium Sulfate?',
        options: ['Blood pressure 140/90 mmHg', 'Patellar deep tendon reflex absent', 'Urine output 40 mL/hour', 'Serum magnesium level 5 mg/dL'],
        answer: 'B',
        explanation: 'Loss of deep tendon reflexes (patellar reflex) is the earliest sign of magnesium toxicity. Normal therapeutic range is 4-7 mg/dL; reflexes disappear at 8-10 mg/dL.'
      },
      {
        id: 'sq-obg-4',
        question: 'Lochia serosa typically persists for how many days postpartum?',
        options: ['Days 1 to 4', 'Days 5 to 9', 'Days 10 to 14', 'Days 15 to 28'],
        answer: 'B',
        explanation: 'Postpartum vaginal discharge stages: Lochia rubra (days 1-4, red), Lochia serosa (days 5-9, pinkish-brown), Lochia alba (days 10-15+, yellowish-white).'
      },
      {
        id: 'sq-obg-5',
        question: 'The most common site of ectopic pregnancy implantation is:',
        options: ['Ampulla of Fallopian tube', 'Isthmus of Fallopian tube', 'Fimbrial end', 'Cervix'],
        answer: 'A',
        explanation: 'Over 95% of ectopic pregnancies occur in the fallopian tube, with the ampulla being the most common site (~70%).'
      }
    ]
  },
  {
    id: 'subj-fon',
    title: 'Fundamentals of Nursing & Ethics',
    icon: 'HeartPulse',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Vital Signs', 'Catheterization', 'Injections', 'Decubitus Ulcer', 'Fluid Balance'],
    questions: [
      {
        id: 'sq-fon-1',
        question: 'At what angle should an intramuscular injection be administered into the vastus lateralis or dorsogluteal muscle?',
        options: ['15 degrees', '45 degrees', '90 degrees', '30 degrees'],
        answer: 'C',
        explanation: 'Intramuscular injections are administered at a 90-degree angle to penetrate deep into muscle tissue. Subcutaneous injections are given at 45 or 90 degrees; intradermal at 10-15 degrees.'
      },
      {
        id: 'sq-fon-2',
        question: 'A Stage 2 pressure injury is defined by which clinical description?',
        options: [
          'Non-blanchable erythema of intact skin',
          'Partial-thickness loss of skin with exposed dermis, pink wound bed, or intact serum-filled blister',
          'Full-thickness skin loss with visible subcutaneous adipose tissue',
          'Full-thickness tissue loss with exposed bone, muscle, or tendon'
        ],
        answer: 'B',
        explanation: 'Stage 2 involves partial-thickness loss of dermis presenting as a shallow open ulcer or intact/ruptured serum blister. Stage 1 is non-blanchable redness; Stage 3 reaches subcutaneous fat; Stage 4 exposes muscle/bone.'
      },
      {
        id: 'sq-fon-3',
        question: 'Which position is preferred when administering a cleansing enema to an adult client?',
        options: ['Right lateral Sims position', 'Left lateral Sims position', 'Supine position', 'Lithotomy position'],
        answer: 'B',
        explanation: 'Left lateral Sims position allows enema solution to flow downwards by gravity into the sigmoid colon and rectum following anatomical curvature.'
      }
    ]
  },
  {
    id: 'subj-peds',
    title: 'Pediatric & Child Health Nursing',
    icon: 'Sparkles',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['APGAR Score', 'Congenital Heart Defects', 'Croup vs Epiglottitis', 'Phototherapy', 'Dehydration'],
    questions: [
      {
        id: 'sq-ped-1',
        question: 'A newborn at 1 minute has a heart rate of 110 bpm, vigorous crying, active motion, pink body with bluish extremities (acrocyanosis), and grimaces to suctioning. What is the APGAR score?',
        options: ['7', '8', '9', '10'],
        answer: 'C',
        explanation: 'Heart rate >100 = 2; Respiration (vigorous cry) = 2; Muscle tone (active motion) = 2; Reflex irritability (grimace) = 1 or 2; Color (acrocyanosis) = 1. Total score = 2+2+2+2+1 = 9.'
      },
      {
        id: 'sq-ped-2',
        question: 'Which congenital heart anomaly is classified as an acyanotic defect with increased pulmonary blood flow?',
        options: ['Tetralogy of Fallot', 'Transposition of the Great Arteries', 'Ventricular Septal Defect (VSD)', 'Tricuspid atresia'],
        answer: 'C',
        explanation: 'Ventricular Septal Defect (VSD), ASD, and PDA are left-to-right shunts causing increased pulmonary blood flow without central cyanosis.'
      },
      {
        id: 'sq-ped-3',
        question: 'Which assessment is strictly CONTRAINDICATED in a child suspected of having Acute Epiglottitis?',
        options: ['Monitoring continuous pulse oximetry', 'Direct inspection of the throat with a tongue depressor', 'Administering humidified oxygen', 'Keeping child in parent’s lap'],
        answer: 'B',
        explanation: 'Direct examination of the throat or inserting a tongue depressor in suspected epiglottitis can trigger sudden complete laryngospasm and fatal airway obstruction.'
      }
    ]
  },
  {
    id: 'subj-pharm',
    title: 'Pharmacology & Drug Calculations',
    icon: 'Pill',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Dosage Formulas', 'Cardiac Glycosides', 'Antibiotics', 'Insulin Regimens', 'Chemotherapy'],
    questions: [
      {
        id: 'sq-ph-1',
        question: 'A doctor prescribes 500 mL of 0.9% Normal Saline to be infused over 4 hours. The drop factor is 15 gtt/mL. What should be the drip rate in drops per minute (gtt/min)?',
        options: ['21 gtt/min', '31 gtt/min', '42 gtt/min', '52 gtt/min'],
        answer: 'B',
        explanation: 'Formula: (Volume in mL × Drop Factor) / (Time in minutes). (500 × 15) / (4 × 60) = 7500 / 240 = 31.25 -> approx. 31 drops/minute.'
      },
      {
        id: 'sq-ph-2',
        question: 'Before administering Digoxin to an adult, the nurse must assess the apical pulse for 1 full minute. The dose should be withheld if the apical heart rate is below:',
        options: ['80 bpm', '70 bpm', '60 bpm', '50 bpm'],
        answer: 'C',
        explanation: 'Digoxin slows atrioventricular conduction. Withhold Digoxin and notify provider if apical heart rate is < 60 bpm in adults (< 70 bpm in children, < 90 bpm in infants).'
      },
      {
        id: 'sq-ph-3',
        question: 'Which of the following insulins is rapid-acting with an onset of 10 to 15 minutes?',
        options: ['Regular Insulin', 'Insulin Lispro (Humalog)', 'NPH Insulin', 'Insulin Glargine (Lantus)'],
        answer: 'B',
        explanation: 'Insulin Lispro, Aspart, and Glulisine are rapid-acting insulins with onset 10-15 mins, peak 1-2 hours. Regular insulin is short-acting (onset 30 mins).'
      }
    ]
  },
  {
    id: 'subj-ap',
    title: 'Anatomy & Physiology',
    icon: 'Activity',
    category: 'allied-sciences',
    questionCount: 30,
    highYieldTopics: ['Cranial Nerves', 'Endocrine Glands', 'Circulatory System', 'Nephron Physiology'],
    questions: [
      {
        id: 'sq-ap-1',
        question: 'Which cranial nerve is responsible for sensory taste sensation on the anterior two-thirds of the tongue and motor control of facial expression?',
        options: ['Cranial Nerve V (Trigeminal)', 'Cranial Nerve VII (Facial)', 'Cranial Nerve IX (Glossopharyngeal)', 'Cranial Nerve XII (Hypoglossal)'],
        answer: 'B',
        explanation: 'CN VII (Facial Nerve) controls muscles of facial expression and provides taste to anterior 2/3 of tongue. CN IX controls taste to posterior 1/3.'
      },
      {
        id: 'sq-ap-2',
        question: 'The structural and functional filtration unit of the human kidney is the:',
        options: ['Loop of Henle', 'Glomerulus', 'Nephron', 'Renal pelvis'],
        answer: 'C',
        explanation: 'The nephron is the microscopic structural and functional unit of the kidney, with roughly 1 to 1.2 million nephrons per kidney.'
      }
    ]
  },
  {
    id: 'subj-chn',
    title: 'Community Health Nursing (CHN)',
    icon: 'ShieldCheck',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Primary Health Care', 'Epidemiology', 'Water Purification', 'Vector-Borne Diseases', 'Health Committees'],
    questions: [
      {
        id: 'sq-chn-1',
        question: 'What is the population norm for a Primary Health Centre (PHC) in plain and hilly/tribal areas respectively in India?',
        options: [
          '30,000 (Plain) and 20,000 (Hilly/Tribal)',
          '50,000 (Plain) and 30,000 (Hilly/Tribal)',
          '5,000 (Plain) and 3,000 (Hilly/Tribal)',
          '1,20,000 (Plain) and 80,000 (Hilly/Tribal)'
        ],
        answer: 'A',
        explanation: 'Health infrastructure population norms in India: Sub-centre = 5,000 (Plain) / 3,000 (Hilly); PHC = 30,000 (Plain) / 20,000 (Hilly); CHC = 1,20,000 (Plain) / 80,000 (Hilly).'
      },
      {
        id: 'sq-chn-2',
        question: 'Which level of prevention is illustrated by screening for cervical cancer via Pap smear?',
        options: ['Primordial prevention', 'Primary prevention', 'Secondary prevention', 'Tertiary prevention'],
        answer: 'C',
        explanation: 'Secondary prevention aims for early detection and prompt treatment of subclinical disease (e.g. screening mammograms, Pap smear, BP screening).'
      }
    ]
  },
  {
    id: 'subj-medsurg-cv',
    title: 'Medical-Surgical: Cardiovascular & Hematology',
    icon: 'Heart',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Myocardial Infarction', 'Heart Failure', 'ECG Rhythms', 'Blood Transfusion Reactions', 'Shock'],
    questions: [
      {
        id: 'sq-cv-1',
        question: 'Which cardiac biomarker is the most sensitive and specific indicator of Acute Myocardial Infarction (AMI)?',
        options: ['Creatine Kinase-MB (CK-MB)', 'Cardiac Troponin I / T', 'Myoglobin', 'Lactate dehydrogenase (LDH)'],
        answer: 'B',
        explanation: 'Cardiac Troponin I and T are the gold standard cardiac biomarkers, elevating within 3-4 hours and remaining elevated for up to 10-14 days.'
      },
      {
        id: 'sq-cv-2',
        question: 'What is the immediate priority nursing action when a patient receiving a blood transfusion complains of chills, back pain, and dyspnea?',
        options: [
          'Slow the blood infusion rate and call the physician',
          'Immediately stop the transfusion and disconnect blood tubing, maintaining IV access with normal saline',
          'Administer IV diphenhydramine immediately',
          'Check the patient’s vital signs and wait 15 minutes'
        ],
        answer: 'B',
        explanation: 'At the earliest indication of a hemolytic transfusion reaction, immediately halt the transfusion, disconnect tubing at the cannula hub, and run 0.9% normal saline with new tubing to prevent acute renal failure and shock.'
      }
    ]
  },
  {
    id: 'subj-medsurg-resp',
    title: 'Medical-Surgical: Respiratory & Renal',
    icon: 'Wind',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Tuberculosis & DOTS', 'Asthma', 'COPD', 'Chest Tube Drainage', 'Acute Kidney Injury', 'Dialysis'],
    questions: [
      {
        id: 'sq-resp-1',
        question: 'Continuous vigorous bubbling in the water-seal chamber of a closed chest tube drainage system indicates:',
        options: ['Normal functioning during exhalation', 'Systemic air leak in the tubing or connection', 'Accumulation of serosanguinous fluid', 'Tube occlusion by a fibrin clot'],
        answer: 'B',
        explanation: 'Intermittent tidaling/bubbling with respiration is normal. Continuous vigorous bubbling in the water-seal chamber indicates an air leak in the chest tube system.'
      },
      {
        id: 'sq-resp-2',
        question: 'A client with chronic kidney disease has a serum potassium level of 6.8 mEq/L. Which ECG change is anticipated?',
        options: ['Prominent U waves and ST depression', 'Tall peaked T waves and widened QRS complex', 'Prolonged QT interval and flat T waves', 'Shortened PR interval'],
        answer: 'B',
        explanation: 'Hyperkalemia (> 5.5 mEq/L) produces tall, peaked, tented T waves, widened QRS complexes, prolonged PR intervals, and potential progression to ventricular fibrillation.'
      }
    ]
  },
  {
    id: 'subj-medsurg-neuro',
    title: 'Medical-Surgical: Neurology & Musculoskeletal',
    icon: 'Brain',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Stroke', 'Increased ICP (Cushing’s Triad)', 'Parkinson’s', 'Myasthenia Gravis', 'Compartment Syndrome'],
    questions: [
      {
        id: 'sq-neuro-1',
        question: 'Cushing’s Triad, a sign of critically elevated Intracranial Pressure (ICP), consists of:',
        options: [
          'Tachycardia, hypotension, and tachypnea',
          'Systolic hypertension with widening pulse pressure, bradycardia, and irregular respirations (Cheyne-Stokes)',
          'Hypotension, bradycardia, and hypothermia',
          'Hypertension, tachycardia, and shallow hyperventilation'
        ],
        answer: 'B',
        explanation: 'Cushing’s Triad is the physiological response to late increased ICP: widening pulse pressure (elevated systolic BP), bradycardia, and irregular/Cheyne-Stokes respirations.'
      },
      {
        id: 'sq-neuro-2',
        question: 'What is the earliest and most sensitive symptom of Compartment Syndrome following limb fracture casting?',
        options: ['Absence of distal peripheral pulse (pulselessness)', 'Severe, unremitting pain out of proportion to injury, unrelieved by analgesics', 'Coldness and pallor of the extremity', 'Paresis or paralysis'],
        answer: 'B',
        explanation: 'Pain out of proportion to injury, especially on passive stretch of digits, is the earliest warning sign of compartment syndrome. Pulselessness is a very late and irreversible sign.'
      }
    ]
  },
  {
    id: 'subj-psych',
    title: 'Psychiatric & Mental Health Nursing',
    icon: 'Smile',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['Schizophrenia', 'Bipolar & Lithium', 'Defense Mechanisms', 'Electroconvulsive Therapy (ECT)', 'Suicide Assessment'],
    questions: [
      {
        id: 'sq-psy-1',
        question: 'What is the therapeutic serum level range for Lithium carbonate used in Bipolar Affective Disorder maintenance?',
        options: ['0.2 to 0.5 mEq/L', '0.6 to 1.2 mEq/L', '1.5 to 2.5 mEq/L', '2.5 to 3.5 mEq/L'],
        answer: 'B',
        explanation: 'Therapeutic serum lithium levels are 0.6–1.2 mEq/L (up to 1.4 mEq/L in acute mania). Toxicity manifests at levels > 1.5 mEq/L with coarse tremors, ataxia, and vomiting.'
      },
      {
        id: 'sq-psy-2',
        question: 'A client states, "I hear FBI agents telling me through the walls that I have been poisoned." This symptom represents:',
        options: ['Illusion', 'Auditory Hallucination and Persecutory Delusion', 'Flight of ideas', 'Depersonalization'],
        answer: 'B',
        explanation: 'Hearing voices without external acoustic stimulus is an auditory hallucination; false fixed belief of being poisoned is a persecutory delusion.'
      }
    ]
  },
  {
    id: 'subj-micro',
    title: 'Microbiology & Infection Control',
    icon: 'TestTube',
    category: 'allied-sciences',
    questionCount: 30,
    highYieldTopics: ['Biomedical Waste Management', 'Autoclaving & Sterilization', 'Nosocomial Infections', 'Gram Staining'],
    questions: [
      {
        id: 'sq-mic-1',
        question: 'According to India Biomedical Waste Management Rules, into which color-coded bin should blood-soaked gauze and cotton dressings be discarded?',
        options: ['Red bin', 'Yellow bin', 'Blue box', 'White puncture-proof container'],
        answer: 'B',
        explanation: 'Yellow color-coded bags/bins are designated for anatomical waste, soiled dressings, linen with blood, and expired cytotoxic drugs slated for incineration.'
      },
      {
        id: 'sq-mic-2',
        question: 'Standard operating parameters for hospital Autoclaving (steam sterilization under pressure) are:',
        options: [
          '100°C at 10 psi for 10 minutes',
          '121°C at 15 psi for 15 to 20 minutes',
          '160°C dry heat for 60 minutes',
          '140°C at 30 psi for 5 minutes'
        ],
        answer: 'B',
        explanation: 'Standard autoclave cycle utilizes saturated steam at 121°C (250°F) under 15 lbs/sq inch gauge pressure for 15-20 minutes, killing all spores including Bacillus stearothermophilus.'
      }
    ]
  },
  {
    id: 'subj-nutri',
    title: 'Nutrition & Biochemistry',
    icon: 'Apple',
    category: 'allied-sciences',
    questionCount: 30,
    highYieldTopics: ['Vitamins & Deficiencies', 'Kwashiorkor vs Marasmus', 'Electrolytes', 'Daily Caloric Allowances'],
    questions: [
      {
        id: 'sq-nut-1',
        question: 'Wernicke-Korsakoff syndrome, characterized by ataxia, ophthalmoplegia, and confabulation in chronic alcoholism, is caused by deficiency of:',
        options: ['Vitamin B1 (Thiamine)', 'Vitamin B3 (Niacin)', 'Vitamin B6 (Pyridoxine)', 'Vitamin B12 (Cobalamin)'],
        answer: 'A',
        explanation: 'Thiamine (Vitamin B1) deficiency results in Wernicke’s encephalopathy. Alcohol impairs thiamine absorption and utilization.'
      },
      {
        id: 'sq-nut-2',
        question: 'Which feature distinguishes Kwashiorkor from Marasmus in severe protein-energy malnutrition?',
        options: ['Severe generalized muscle wasting with skin and bones look', 'Nutritional edema (pitting edema of feet/face) and moon face', 'Absence of dermatosis', 'Alert and hungry child'],
        answer: 'B',
        explanation: 'Kwashiorkor is protein deficiency with preserved calories causing hypoalbuminemia, pitting edema, hepatomegaly, and moon facies. Marasmus is total calorie and protein deprivation causing emaciation.'
      }
    ]
  },
  {
    id: 'subj-research',
    title: 'Nursing Research & Statistics',
    icon: 'FileText',
    category: 'allied-sciences',
    questionCount: 30,
    highYieldTopics: ['Study Designs', 'Sampling Techniques', 'Measures of Central Tendency', 'Validity & Reliability'],
    questions: [
      {
        id: 'sq-res-1',
        question: 'Which measure of central tendency is the most suitable when a distribution contains extreme outlier values?',
        options: ['Mean', 'Median', 'Mode', 'Standard Deviation'],
        answer: 'B',
        explanation: 'The Median is the middle value and is not skewed by extreme outliers, making it the preferred measure for skewed distributions.'
      },
      {
        id: 'sq-res-2',
        question: 'A research study where subjects are randomly assigned to either an experimental intervention group or a control group is termed:',
        options: ['Descriptive survey', 'Randomized Controlled Trial (True Experimental)', 'Correlational study', 'Phenomenological qualitative design'],
        answer: 'B',
        explanation: 'A true experimental design requires three hallmarks: Manipulation, Control, and Randomization.'
      }
    ]
  },
  {
    id: 'subj-mgmt',
    title: 'Nursing Education & Administration',
    icon: 'Users',
    category: 'allied-sciences',
    questionCount: 30,
    highYieldTopics: ['Leadership Styles', 'Staffing & Duty Rostering', 'Nursing Audit', 'Triage Systems', 'INC Norms'],
    questions: [
      {
        id: 'sq-mgt-1',
        question: 'Under START disaster triage protocol, what color triage tag is assigned to a patient with open airway and respiratory rate > 30 breaths/minute?',
        options: ['Green (Minor)', 'Yellow (Delayed)', 'Red (Immediate)', 'Black (Deceased)'],
        answer: 'C',
        explanation: 'In START triage, any victim with compromised RPM (Respirations >30, absent radial pulse/cap refill >2 sec, or inability to follow commands) receives a RED tag (Immediate priority).'
      },
      {
        id: 'sq-mgt-2',
        question: 'Which leadership style is characterized by "hands-off" non-interference, allowing subordinates complete freedom in decision making?',
        options: ['Autocratic leadership', 'Democratic leadership', 'Laissez-faire leadership', 'Transformational leadership'],
        answer: 'C',
        explanation: 'Laissez-faire (permissive) leadership allows full decision autonomy without guidance or supervision from the leader.'
      }
    ]
  },
  {
    id: 'subj-emergency',
    title: 'Emergency, CPR & Critical Care Nursing',
    icon: 'Flame',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['BLS & ACLS 2026', 'Chest Compression Ratios', 'Defibrillation', 'Triage Colors', 'Burns Rule of Nines'],
    questions: [
      {
        id: 'sq-em-1',
        question: 'According to AHA BLS guidelines, what is the recommended chest compression rate and depth for an adult cardiac arrest victim?',
        options: [
          '80–100 compressions/min, depth of 1 inch',
          '100–120 compressions/min, depth of at least 2 inches (5 cm) but no more than 2.4 inches (6 cm)',
          '120–140 compressions/min, depth of 3 inches',
          '60–80 compressions/min, depth of 1.5 inches'
        ],
        answer: 'B',
        explanation: 'AHA guidelines mandate high-quality CPR: rate of 100-120 compressions/minute, depth of at least 2 inches (5 cm), complete chest recoil between compressions, minimizing interruptions.'
      },
      {
        id: 'sq-em-2',
        question: 'According to the Wallace Rule of Nines, what percentage of Total Body Surface Area (TBSA) is burned if an adult suffers burns over the entire anterior chest, abdomen, and both entire arms?',
        options: ['18%', '27%', '36%', '45%'],
        answer: 'C',
        explanation: 'Rule of Nines: Entire anterior trunk (chest + abdomen) = 18%. Each entire arm (anterior + posterior) = 9%. Both arms = 18%. Total TBSA = 18% + 18% = 36%.'
      }
    ]
  },
  {
    id: 'subj-onco',
    title: 'Genetics, Oncology & Palliative Care',
    icon: 'Dna',
    category: 'core-nursing',
    questionCount: 30,
    highYieldTopics: ['TNM Staging', 'Chemotherapy Extravasation', 'Tumor Lysis Syndrome', 'Superior Vena Cava Syndrome'],
    questions: [
      {
        id: 'sq-onco-1',
        question: 'Tumor Lysis Syndrome is characterized by which constellation of electrolyte derangements?',
        options: [
          'Hyperkalemia, Hyperphosphatemia, Hyperuricemia, and Hypocalcemia',
          'Hypokalemia, Hypophosphatemia, Hypouricemia, and Hypercalcemia',
          'Hypercalcemia, Hyponatremia, and Hypoglycemia',
          'Hypokalemia, Hypernatremia, and Acidosis'
        ],
        answer: 'A',
        explanation: 'Rapid breakdown of tumor cells releases intracellular contents: Potassium (Hyperkalemia), Phosphate (Hyperphosphatemia), and Nucleic acids degraded into uric acid (Hyperuricemia). Excess phosphate binds serum calcium, causing reciprocal Hypocalcemia.'
      }
    ]
  },
  {
    id: 'subj-gk',
    title: 'General Knowledge & Current Affairs',
    icon: 'Compass',
    category: 'non-nursing',
    questionCount: 30,
    highYieldTopics: ['Constitution of India', 'Geography', 'National Health Programs', 'Important Days'],
    questions: [
      {
        id: 'sq-gk-1',
        question: 'Who is regarded as the "Father of the Constitution of India" and served as Chairman of the Drafting Committee?',
        options: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel'],
        answer: 'B',
        explanation: 'Dr. Bhimrao Ramji Ambedkar chaired the Drafting Committee of the Constituent Assembly and is recognized as the chief architect of the Indian Constitution.'
      },
      {
        id: 'sq-gk-2',
        question: 'World Health Day is observed globally each year on:',
        options: ['April 7', 'May 12', 'December 1', 'October 10'],
        answer: 'A',
        explanation: 'World Health Day is celebrated on April 7, marking the founding of the World Health Organization (WHO) in 1948. International Nurses Day is observed on May 12.'
      }
    ]
  },
  {
    id: 'subj-reasoning',
    title: 'General Intelligence & Reasoning',
    icon: 'Layers',
    category: 'non-nursing',
    questionCount: 30,
    highYieldTopics: ['Blood Relations', 'Coding-Decoding', 'Number Series', 'Syllogism', 'Direction Sense'],
    questions: [
      {
        id: 'sq-reas-1',
        question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
        options: ['Brother', 'Uncle', 'Father', 'Cousin'],
        answer: 'C',
        explanation: '"The only son of my mother" refers to Suresh himself. Therefore, the boy in the photograph is Suresh’s son, meaning Suresh is his father.'
      },
      {
        id: 'sq-reas-2',
        question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
        options: ['95', '127', '128', '144'],
        answer: 'B',
        explanation: 'Pattern: (Number × 2) + 1. 3×2+1=7; 7×2+1=15; 15×2+1=31; 31×2+1=63; 63×2+1 = 127.'
      }
    ]
  },
  {
    id: 'subj-aptitude',
    title: 'General English & Mathematics',
    icon: 'BookOpen',
    category: 'non-nursing',
    questionCount: 30,
    highYieldTopics: ['Medical Terminology', 'Grammar', 'Percentages & Ratios', 'Simple Interest'],
    questions: [
      {
        id: 'sq-apt-1',
        question: 'Select the synonym of the word "PROGNOSIS":',
        options: ['Diagnosis', 'Forecast / Prediction of disease outcome', 'Pathological cause', 'Medical prescription'],
        answer: 'B',
        explanation: 'Prognosis refers to the medical forecast or anticipated clinical course and outcome of an illness.'
      },
      {
        id: 'sq-apt-2',
        question: 'If a staff nurse’s monthly basic salary increases from ₹40,000 to ₹46,000, what is the percentage increase?',
        options: ['12%', '15%', '18%', '20%'],
        answer: 'B',
        explanation: 'Increase = ₹46,000 - ₹40,000 = ₹6,000. Percentage increase = (6,000 / 40,000) × 100 = 15%.'
      }
    ]
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [];

export const INITIAL_CLINICAL_IMAGES: ClinicalImage[] = [];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'TR-2026-9281',
    buyerName: 'Sneha Kumari',
    phone: '9876543210',
    altPhone: '9123456780',
    address: 'Room 204, Nursing Hostel, AIIMS Campus, Basni',
    city: 'Jodhpur',
    state: 'Rajasthan',
    pincode: '342005',
    landmark: 'Near AIIMS Gate No. 2',
    items: [
      {
        id: 'set-complete',
        name: 'Total Recall Complete 2-Volume Set',
        volume: 'Vol 1 & Vol 2 Combined',
        quantity: 1,
        price: 1999,
        mrp: 2390
      }
    ],
    itemDescription: 'Complete 2-Volume Master Set (Vol 1 + Vol 2)',
    totalAmount: 1999,
    utr: '419283746192',
    upiIdUsed: 'kiranpatil.nursing@okaxis',
    payeeName: 'KIRAN S M PATIL',
    status: 'Dispatched',
    trackingNumber: 'ED839182391IN',
    courierPartner: 'India Post Speed Post',
    adminNote: 'Dispatched via Speed Post on 06-Oct. Estimated delivery within 48 hours.',
    createdAt: '2026-10-06T14:32:00Z',
    updatedAt: '2026-10-06T18:10:00Z'
  }
];
