-- Seed Grade 3 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade3', 'Grade 3', 'Navigate multiplication seas and fraction reefs!', 7, 'green', '🐢', 3, 'published')
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
  ('multiplication', 'grade3', 'Turtle Multiplication', 'Multiply like a patient turtle!', '🐢', 'intermediate', 'multiplication', 1, 'published'),
  ('division', 'grade3', 'Division Dolphins', 'Divide treasures fairly!', '🐬', 'intermediate', 'division', 2, 'published'),
  ('fractions', 'grade3', 'Coral Fraction Reef', 'Explore fractions in coral patterns!', '🪸', 'intermediate', 'fractions', 3, 'published'),
  ('measurement', 'grade3', 'Lighthouse Measurement', 'Measure area and perimeter of islands!', '🌅', 'intermediate', 'measurement', 4, 'published'),
  ('geometry', 'grade3', 'Geometric Ocean Patterns', 'Discover patterns in ocean life!', '🌊', 'intermediate', 'geometry', 5, 'published'),
  ('multiplication-fluency', 'grade3', 'Lightning Multiplication', 'Master multiplication facts with speed and accuracy!', '⚡', 'intermediate', 'multiplication', 6, 'published'),
  ('equivalent-fractions', 'grade3', 'Equivalent Fraction Currents', 'Discover fractions that are equal in value!', '🟰', 'intermediate', 'fractions', 7, 'published'),
  ('compare-fractions', 'grade3', 'Fraction Balance', 'Compare fractions to see which is larger!', '⚖️', 'intermediate', 'fractions', 8, 'published'),
  ('area-perimeter-problems', 'grade3', 'Island Measurement Challenges', 'Solve real-world area and perimeter problems!', '📐', 'intermediate', 'measurement', 9, 'published'),
  ('shape-attributes', 'grade3', 'Shape Property Explorer', 'Learn what makes each shape unique!', '⬜', 'intermediate', 'geometry', 10, 'published'),
  ('time-to-minute', 'grade3', 'Precise Ocean Time', 'Tell time accurately to the exact minute!', '⏰', 'intermediate', 'time', 11, 'published'),
  ('money-math', 'grade3', 'Treasure Coin Math', 'Solve money problems with pirate treasure!', '💎', 'intermediate', 'money', 12, 'published'),
  ('rounding', 'grade3', 'Rounding Reef', 'Round numbers to the nearest ten and hundred!', '🔢', 'intermediate', 'numbers', 13, 'published'),
  ('two-step-problems', 'grade3', 'Two-Step Ocean Challenges', 'Solve problems that need two operations!', '🤔', 'intermediate', 'problem-solving', 14, 'published')
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
  ('grade3', 'multiplication', 'Understand multiplication as equal groups and repeated addition.', array['Count in equal groups'], 'Multiplication combines equal groups into one total. Students learn to see repeated addition, arrays, and skip counting as different ways to represent the same idea.', array['Equal groups make multiplication', 'Repeated addition is a helpful model'], 'Students learn multiplication as a shortcut for adding equal groups.', array['Mixing up group size and number of groups', 'Skipping a group', 'Thinking multiplication only means memorizing facts'], array['Use objects and arrays first', 'Say the equal-group story aloud', 'Connect to skip counting'], 'published', 1),
  ('grade3', 'division', 'Understand division as sharing equally and finding how many groups or items are in each group.', array['Know multiplication facts to 100'], 'Division is the inverse of multiplication. Students share objects fairly or split them into equal groups, then use multiplication to check their answers.', array['Division means equal sharing', 'Division and multiplication are related'], 'Students learn to divide by sharing and by thinking about related facts.', array['Forgetting to share equally', 'Using multiplication in the wrong direction', 'Ignoring remainders when they matter'], array['Start with real objects', 'Show the sharing clearly', 'Ask students to check with multiplication'], 'published', 1),
  ('grade3', 'fractions', 'Recognize fractions as equal parts of a whole and compare simple fractions.', array['Understand equal sharing'], 'Fractions describe equal parts of a whole. Students use circles, bars, and sets of objects to see how wholes can be partitioned into smaller parts.', array['The parts must be equal', 'The denominator shows the number of equal parts'], 'Students learn to read and build simple fractions from pictures and shapes.', array['Counting shaded parts that are not equal', 'Confusing numerator and denominator', 'Thinking a larger denominator always means a larger fraction'], array['Use visual models', 'Fold paper or draw equal parts', 'Compare fractions with the same whole'], 'published', 1),
  ('grade3', 'measurement', 'Measure area, perimeter, time to the minute, and volume in simple contexts.', array['Know basic length and time concepts'], 'Measurement in Grade 3 expands into area, perimeter, time, and volume. Students choose the right attribute, measure carefully, and solve real-world situations.', array['Area covers the inside', 'Perimeter goes around the outside', 'Time to the minute needs careful reading'], 'Students learn to measure and solve problems with area, perimeter, time, and volume.', array['Confusing area with perimeter', 'Reading the clock hand too quickly', 'Using the wrong unit'], array['Model each measurement type separately', 'Use grids, clocks, and containers', 'Have students explain which measurement they chose'], 'published', 1),
  ('grade3', 'geometry', 'Describe shapes by their properties, symmetry, and number of sides.', array['Know basic 2D shapes'], 'Geometry focuses on properties that shapes share. Students sort shapes by sides, angles, symmetry, and whether they are polygons.', array['Properties describe the shape', 'Polygons are closed shapes made of straight sides'], 'Students learn to describe and classify shapes using their attributes.', array['Counting corners incorrectly', 'Calling every shape with four sides a square', 'Ignoring symmetry or angle features'], array['Compare shapes side by side', 'Ask for explanations using features', 'Use sorting tasks'], 'published', 1),
  ('grade3', 'multiplication-fluency', 'Recall multiplication facts quickly and accurately.', array['Know multiplication meaning'], 'Fluency means solving multiplication facts without long delay. Students keep practicing until facts become automatic and can be used in larger problems.', array['Accuracy first, then speed', 'Facts should become automatic with practice'], 'Students build speed and confidence with multiplication facts.', array['Rushing and making mistakes', 'Avoiding harder facts', 'Separating fluency from understanding'], array['Mix timed and untimed practice', 'Use short daily review', 'Connect facts to arrays and groups'], 'published', 1),
  ('grade3', 'equivalent-fractions', 'Identify fractions that name the same amount.', array['Understand fractions as equal parts'], 'Equivalent fractions look different but represent the same amount. Students use visual models and simple multiplication patterns to find them.', array['Equivalent fractions have the same value', 'You can multiply top and bottom by the same number'], 'Students learn that different fractions can be equal in value.', array['Changing only the numerator or denominator', 'Comparing by number size alone', 'Thinking all fraction forms are different amounts'], array['Use shaded models', 'Show matching fraction strips', 'Ask students to explain why the fractions match'], 'published', 1),
  ('grade3', 'compare-fractions', 'Compare simple fractions using visual and numerical reasoning.', array['Know equivalent fractions'], 'Fraction comparison starts with the same whole. Students look at numerator size, denominator size, and visual models to decide which fraction is larger.', array['Compare fractions with the same whole', 'A smaller denominator means larger pieces'], 'Students learn to compare fractions with >, <, and =.', array['Comparing fractions with different wholes', 'Ignoring the size of the pieces', 'Treating a larger denominator as always larger'], array['Use fraction bars and number lines', 'Compare one whole at a time', 'Ask which piece is larger'], 'published', 1),
  ('grade3', 'area-perimeter-problems', 'Solve real-world problems that require area or perimeter.', array['Know area and perimeter meanings'], 'Area and perimeter problems ask students to decide whether they are measuring the inside of a shape or the distance around it. The key is to match the question to the quantity.', array['Area is inside', 'Perimeter is around the edge'], 'Students learn to choose the correct measurement in word problems.', array['Using area when perimeter is needed', 'Forgetting to count all sides', 'Mixing units'], array['Draw the shape first', 'Label dimensions', 'Have students explain why they chose area or perimeter'], 'published', 1),
  ('grade3', 'shape-attributes', 'Describe shapes by sides, angles, and symmetry.', array['Recognize common shapes'], 'Shape attributes are the features that define a shape. Students describe squares, rectangles, triangles, and other polygons by their sides and angles.', array['Sides and angles help identify shapes', 'Symmetry is a useful property'], 'Students learn to tell shapes apart by their features.', array['Using appearance only', 'Ignoring equal sides or equal angles', 'Mixing up polygons and non-polygons'], array['Trace the edges', 'Compare attributes in a chart', 'Use fold-and-check symmetry tasks'], 'published', 1),
  ('grade3', 'time-to-minute', 'Read analog clocks to the exact minute.', array['Know hour and half-hour times'], 'Telling time to the minute requires reading both hands carefully and understanding the minute marks around the clock.', array['The minute hand shows minute marks', 'The hour hand moves gradually'], 'Students learn to read precise clock times.', array['Ignoring minute marks', 'Reading the hour hand too loosely', 'Mixing up the hands'], array['Use labeled practice clocks', 'Count by fives and then by ones', 'Relate clock positions to daily routines'], 'published', 1),
  ('grade3', 'money-math', 'Add, subtract, and compare money amounts.', array['Know coin values'], 'Money math uses cents and dollars in real situations. Students solve addition and subtraction problems, make change, and compare amounts.', array['Money values must be read carefully', 'Dollar and cent symbols matter'], 'Students learn to solve simple money problems in context.', array['Adding coin counts instead of values', 'Forgetting the decimal in dollars', 'Mixing up dollars and cents'], array['Use price tags and play money', 'Write amounts clearly', 'Ask how much is left or needed'], 'published', 1),
  ('grade3', 'rounding', 'Round numbers to the nearest ten and hundred.', array['Know place value'], 'Rounding makes numbers easier to work with by choosing the nearest ten or hundred. Students compare the number to midpoint values to decide which way to round.', array['5 or more rounds up', 'Less than 5 rounds down'], 'Students learn simple rounding rules for common place values.', array['Rounding to the wrong place', 'Ignoring the digit after the target place', 'Not understanding what “nearest” means'], array['Use number lines', 'Compare to benchmark numbers', 'Practice with real-world estimates'], 'published', 1),
  ('grade3', 'two-step-problems', 'Solve word problems that need two operations.', array['Know addition, subtraction, and multiplication'], 'Two-step problems require students to do one operation and then use the answer in a second step. The main skill is identifying the sequence of steps from the story.', array['Read carefully', 'Solve one step at a time', 'Check the final answer'], 'Students learn to break problems into two smaller actions.', array['Doing steps in the wrong order', 'Stopping after one operation', 'Ignoring units or context'], array['Underline what is known and asked', 'Have students explain both steps', 'Use bar models or drawings'], 'published', 1)
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
