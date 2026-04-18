-- Seed Grade 4 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade4', 'Grade 4', 'Explore the deep sea of large numbers, fractions, and geometry!', 8, 'purple', '🦑', 4, 'published')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  age = excluded.age,
  color = excluded.color,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  status = excluded.status,
  updated_at = now();

insert into math_topics (id, grade_id, title, description, emoji, difficulty, category, sort_order, status)
values
  ('place-value', 'grade4', 'Deep Sea Place Value', 'Dive into millions place value!', '🌊', 'intermediate', 'numbers', 1, 'published'),
  ('multi-digit', 'grade4', 'Multi-Digit Operations', 'Master big number operations!', '🔢', 'intermediate', 'arithmetic', 2, 'published'),
  ('fractions', 'grade4', 'Kraken Fractions', 'Tame the kraken of fractions!', '🦑', 'intermediate', 'fractions', 3, 'published'),
  ('decimals', 'grade4', 'Decimal Depths', 'Explore the world of decimals!', '💧', 'intermediate', 'decimals', 4, 'published'),
  ('factors-multiples', 'grade4', 'Factor Fish', 'Discover factors and multiples in coral patterns!', '🐠', 'intermediate', 'numbers', 5, 'published'),
  ('measurement-conversion', 'grade4', 'Measurement Manta Rays', 'Convert between measurement units!', '🐋', 'intermediate', 'measurement', 6, 'published'),
  ('geometry-lines', 'grade4', 'Geometric Ocean Lines', 'Explore lines, rays, and angles!', '📐', 'intermediate', 'geometry', 7, 'published'),
  ('patterns-sequences', 'grade4', 'Ocean Pattern Puzzles', 'Solve patterns and sequences!', '🎭', 'intermediate', 'patterns', 8, 'published'),
  ('data-interpretation', 'grade4', 'Data Diving', 'Interpret data from ocean charts!', '📊', 'intermediate', 'data', 9, 'published'),
  ('money-operations', 'grade4', 'Treasure Chest Money Operations', 'Master decimal money operations with pirate treasure!', '💰', 'intermediate', 'money', 10, 'published'),
  ('area-perimeter', 'grade4', 'Island Area and Perimeter', 'Calculate area and perimeter of rectangular islands!', '🏝️', 'intermediate', 'measurement', 11, 'published'),
  ('multiplicative-comparison', 'grade4', 'Whale Size Comparisons', 'Compare quantities using multiplication!', '🐋', 'intermediate', 'multiplication', 12, 'published'),
  ('angle-measurement', 'grade4', 'Coral Angle Measurement', 'Measure and draw angles in coral formations!', '📐', 'intermediate', 'geometry', 13, 'published'),
  ('multi-step-problems', 'grade4', 'Deep Sea Challenges', 'Solve complex multi-step problems!', '🤿', 'intermediate', 'problem-solving', 14, 'published'),
  ('metric-system', 'grade4', 'Metric Mermaid Measurements', 'Master the metric system with mermaid magic!', '🧜‍♀️', 'intermediate', 'measurement', 15, 'published')
on conflict (grade_id, id) do update set
  grade_id = excluded.grade_id,
  title = excluded.title,
  description = excluded.description,
  emoji = excluded.emoji,
  difficulty = excluded.difficulty,
  category = excluded.category,
  sort_order = excluded.sort_order,
  status = excluded.status,
  updated_at = now();

insert into math_concept_pages (
  grade_id,
  topic_id,
  learning_goal,
  prerequisites,
  core_explanation,
  key_rules,
  summary,
  common_mistakes,
  teaching_tips,
  status,
  version
)
values
  ('grade4', 'place-value', 'Understand and use place value to millions.', array['Know hundreds, tens, and ones'], 'Place value tells what each digit means based on where it sits in a number. Students extend place value to larger numbers, compare them, and round them to helpful places.', array['Digits change value by place', 'Compare from the leftmost digit first', 'Rounding uses nearby benchmarks'], 'Students learn to read, write, compare, and round large numbers.', array['Reading digits one by one instead of by place', 'Comparing only the last digit', 'Rounding to the wrong place'], array['Use place value charts', 'Show numbers with expanded form', 'Practice estimating with number lines'], 'draft', 1),
  ('grade4', 'multi-digit', 'Add, subtract, multiply, and divide multi-digit numbers.', array['Know basic operations'], 'Multi-digit operations use place value and step-by-step methods to work with larger numbers. Students learn to break problems into manageable parts and check their answers for reasonableness.', array['Line up place values', 'Use each operation carefully', 'Check answers by estimating'], 'Students learn efficient methods for multi-digit calculations and word problems.', array['Ignoring place value alignment', 'Rushing the steps', 'Forgetting to check the result'], array['Model with base-ten blocks', 'Show one operation at a time', 'Compare estimated and exact answers'], 'draft', 1),
  ('grade4', 'fractions', 'Work with fractions, decimals, and comparisons.', array['Understand halves and thirds'], 'Fractions name equal parts of a whole. In Grade 4, students extend this to operations with like denominators, decimal equivalents, and comparison across different forms.', array['Fractions must represent equal parts', 'Decimally written values can match fractions', 'Common denominators help with comparison'], 'Students learn to add, subtract, compare, and interpret fractions and decimals.', array['Treating unequal parts as equal', 'Confusing numerator and denominator', 'Comparing fractions without a common whole'], array['Use fraction strips and area models', 'Relate fractions to money and measurement', 'Ask students to explain their comparisons'], 'draft', 1),
  ('grade4', 'decimals', 'Read, compare, and add decimals.', array['Understand place value'], 'Decimals extend place value beyond whole numbers. Students learn to read tenths and hundredths, compare decimal values, and connect them to fractions and money.', array['The decimal point separates whole and part', 'Compare digits by place', 'Use zero as a placeholder when needed'], 'Students learn to work confidently with decimal notation and simple decimal operations.', array['Ignoring place value after the decimal', 'Reading 0.5 as 0.05', 'Comparing by length of the number instead of value'], array['Use money examples', 'Show decimals on grids', 'Line up decimal points carefully'], 'draft', 1),
  ('grade4', 'factors-multiples', 'Find factors, multiples, prime numbers, and composite numbers.', array['Know multiplication facts'], 'Factors divide evenly into a number, while multiples are products in a pattern. Students use arrays, factor pairs, and divisibility to classify numbers.', array['Factors make equal groups', 'Multiples are numbers in a skip-counting pattern', 'Primes have exactly two factors'], 'Students learn to identify factor pairs, multiples, prime numbers, and composite numbers.', array['Mixing up factors and multiples', 'Thinking every even number is prime', 'Forgetting that 1 is not prime'], array['Use arrays and factor charts', 'Connect to multiplication facts', 'Ask students to list factor pairs'], 'draft', 1),
  ('grade4', 'measurement-conversion', 'Convert between common measurement units and solve time interval problems.', array['Know basic measurement units'], 'Measurement conversion means changing one unit into another equivalent unit. Students use relationships such as minutes and hours or centimeters and meters to solve practical problems.', array['Only convert between matching units', 'Use known relationships', 'Check that units make sense'], 'Students learn to convert units and solve everyday measurement problems.', array['Mixing up unit pairs', 'Adding values with different units without converting', 'Ignoring the unit in the answer'], array['Use real objects and rulers', 'Keep conversion charts visible', 'Practice with clocks and rulers'], 'draft', 1),
  ('grade4', 'geometry-lines', 'Describe lines, rays, angles, and parallel or perpendicular relationships.', array['Know basic shapes'], 'Geometry at this level focuses on line types and how they meet. Students learn to draw and classify line segments, rays, angles, and relationships between lines.', array['Lines extend forever', 'Rays start at one point and go one direction', 'Angles are formed where two rays meet'], 'Students learn to name and describe line and angle features in shapes.', array['Confusing rays and line segments', 'Mixing up parallel and perpendicular', 'Measuring the wrong part of a figure'], array['Use diagrams and tracing paper', 'Label line parts clearly', 'Have students draw examples themselves'], 'draft', 1),
  ('grade4', 'patterns-sequences', 'Generate, extend, and analyze patterns and number sequences.', array['Notice repeating and growing patterns'], 'Patterns can repeat or grow by a rule. Students identify the rule, extend the pattern, and explain how the sequence changes.', array['A pattern follows a rule', 'A sequence can grow by the same amount', 'Explain the next terms from the rule'], 'Students learn to think about repeating and growing patterns in numbers and shapes.', array['Guessing the next term without a rule', 'Changing the pattern midway', 'Missing the growth step'], array['Use visual and numeric patterns', 'Ask students to state the rule', 'Let them create their own sequence'], 'draft', 1),
  ('grade4', 'data-interpretation', 'Read and interpret graphs, line plots, and data displays.', array['Compare numbers and groups'], 'Data interpretation means reading information from charts and graphs and answering questions from what the display shows.', array['Read labels first', 'Compare the values carefully', 'Use the graph to support answers'], 'Students learn to draw conclusions from bar graphs, line plots, and other displays.', array['Ignoring the axis labels', 'Answering from memory instead of the graph', 'Mixing categories'], array['Use class survey data', 'Ask students to justify answers', 'Model reading titles and axes'], 'draft', 1),
  ('grade4', 'money-operations', 'Add, subtract, compare, and make change with money.', array['Know coin and decimal values'], 'Money operations combine place value, decimals, and real-world context. Students solve shopping problems, compare prices, and calculate change.', array['Keep track of cents and dollars', 'Subtract to find change', 'Compare values carefully'], 'Students learn to solve practical money problems with decimal notation.', array['Dropping the decimal point', 'Adding coin counts instead of values', 'Forgetting to subtract change'], array['Use pretend store activities', 'Write amounts clearly', 'Ask how much is left or needed'], 'draft', 1),
  ('grade4', 'area-perimeter', 'Find area, perimeter, and missing side lengths of rectangles.', array['Know basic multiplication and addition'], 'Area measures the inside of a shape and perimeter measures the distance around it. Students decide which one is needed and use formulas to solve problems.', array['Area uses square units', 'Perimeter adds all outer sides', 'Rectangles use length times width for area'], 'Students learn to distinguish area from perimeter and solve related problems.', array['Confusing inside and outside measures', 'Using the wrong formula', 'Forgetting a side when adding perimeter'], array['Draw the shape first', 'Label side lengths', 'Ask students to name the measurement they need'], 'draft', 1),
  ('grade4', 'multiplicative-comparison', 'Compare quantities using multiplication language.', array['Know multiplication meaning'], 'Multiplicative comparison asks how many times as many one quantity is than another. Students use multiplication to compare amounts instead of only adding or subtracting.', array['Times as many means multiplication', 'Look for the smaller and larger quantity', 'Write equations from the comparison'], 'Students learn to compare quantities with multiplication and explain the relationship.', array['Using addition for a multiplicative comparison', 'Swapping the compared quantities', 'Ignoring the phrase times as many'], array['Use bar models', 'Act out comparison stories', 'Ask students to write matching equations'], 'draft', 1),
  ('grade4', 'angle-measurement', 'Measure, classify, and draw angles in degrees.', array['Know basic lines and shapes'], 'Angle measurement uses degrees to show how wide an angle opens. Students identify right, acute, and obtuse angles and use tools to measure them.', array['A right angle is 90 degrees', 'Acute angles are smaller than 90 degrees', 'Obtuse angles are larger than 90 degrees'], 'Students learn to measure and describe angles using degree language.', array['Measuring the wrong side of an angle', 'Calling every corner a right angle', 'Reading the protractor backward'], array['Use a protractor demo', 'Compare angles to a right angle', 'Let students draw and test examples'], 'draft', 1),
  ('grade4', 'multi-step-problems', 'Solve multi-step problems using all four operations and estimation.', array['Know the four operations'], 'Multi-step problems require students to do more than one calculation and to decide the order carefully. Estimation helps check whether the final answer makes sense.', array['Solve one step at a time', 'Keep track of units', 'Estimate to check reasonableness'], 'Students learn to break complex problems into smaller steps and solve them accurately.', array['Doing steps in the wrong order', 'Stopping after one step', 'Ignoring the context of the question'], array['Underline key information', 'Model the steps on paper', 'Ask students to explain each step'], 'draft', 1),
  ('grade4', 'metric-system', 'Use metric units and prefixes to measure and compare quantities.', array['Know basic measurement ideas'], 'The metric system uses powers of ten, so moving between units follows a predictable pattern. Students practice conversions and choose the right unit for the job.', array['Metric units scale by ten', 'Use smaller or larger units as needed', 'Match the unit to the object'], 'Students learn to measure and convert within the metric system.', array['Mixing up prefixes', 'Using the wrong unit size', 'Converting without a clear rule'], array['Show a metric ladder chart', 'Use familiar classroom objects', 'Practice with real conversions'], 'draft', 1)
on conflict (grade_id, topic_id) do update set
  learning_goal = excluded.learning_goal,
  prerequisites = excluded.prerequisites,
  core_explanation = excluded.core_explanation,
  key_rules = excluded.key_rules,
  summary = excluded.summary,
  common_mistakes = excluded.common_mistakes,
  teaching_tips = excluded.teaching_tips,
  status = excluded.status,
  version = math_concept_pages.version + 1,
  updated_at = now();
