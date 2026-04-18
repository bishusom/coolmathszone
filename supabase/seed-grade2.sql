-- Seed Grade 2 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade2', 'Grade 2', 'Swim deeper into math with whale-sized challenges!', 6, 'teal', '🐋', 3, 'published')
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
  ('word-problems', 'grade2', 'Whale Word Problems', 'Solve big problems with whale wisdom!', '🐋', 'intermediate', 'problem-solving', 1, 'published'),
  ('place-value', 'grade2', 'Treasure Chest Place Value', 'Unlock hundreds place with treasure!', '🎁', 'intermediate', 'numbers', 2, 'published'),
  ('measurement', 'grade2', 'Octopus Measurement', 'Measure with all eight arms!', '🐙', 'intermediate', 'measurement', 3, 'published'),
  ('money', 'grade2', 'Sea Treasure Money', 'Count coins like pirate treasure!', '🏴‍☠️', 'intermediate', 'money', 4, 'published'),
  ('time-telling', 'grade2', 'Tide Time Telling', 'Tell time with ocean clocks!', '⏰', 'intermediate', 'time', 5, 'published'),
  ('geometry', 'grade2', 'Shipwreck Geometry', 'Explore geometric treasures in shipwrecks!', '⚓', 'intermediate', 'geometry', 6, 'published'),
  ('time-five-minutes', 'grade2', 'Precise Ocean Time', 'Tell time to the nearest 5 minutes!', '🕒', 'intermediate', 'time', 7, 'published'),
  ('fluency-20', 'grade2', 'Quick Fish Facts', 'Master math facts within 20!', '⚡', 'intermediate', 'arithmetic', 8, 'published'),
  ('standard-measurement', 'grade2', 'Standard Measurement', 'Measure with inches and centimeters!', '📐', 'intermediate', 'measurement', 9, 'published'),
  ('money-word-problems', 'grade2', 'Pirate Money Problems', 'Solve money word problems with pirate treasure!', '🏴‍☠️', 'intermediate', 'money', 10, 'published'),
  ('arrays', 'grade2', 'Coral Arrays', 'Discover arrays in coral patterns!', '🪸', 'intermediate', 'multiplication', 11, 'published'),
  ('repeated-addition', 'grade2', 'Repeated Addition Whales', 'Use repeated addition like whale songs!', '🎵', 'intermediate', 'multiplication', 12, 'published')
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
  ('grade2', 'word-problems', 'Solve one- and two-step stories by choosing the correct operation.', array['Know addition and subtraction'], 'Word problems describe a real situation in words. Students learn to read carefully, find the important numbers, decide what is being asked, and choose the operation that fits.', array['Read the question first', 'Underline the numbers', 'Choose the operation that matches the story'], 'Students learn to solve one- and two-step word problems by reading for meaning.', array['Using the wrong operation', 'Ignoring the question being asked', 'Rushing past key words'], array['Read aloud and restate the problem', 'Use drawings or counters', 'Ask students to explain why they chose add or subtract'], 'draft', 1),
  ('grade2', 'place-value', 'Read, write, and compare three-digit numbers using hundreds, tens, and ones.', array['Understand tens and ones'], 'Place value shows how a number is built from groups of hundreds, tens, and ones. Students learn to break apart numbers, expand them, and compare them by place.', array['Hundreds are larger than tens', 'Compare from left to right'], 'Students learn to read and write three-digit numbers and explain how they are built.', array['Reading digits separately instead of by place', 'Comparing only the last digit', 'Mixing up expanded and standard form'], array['Use base-ten blocks', 'Model numbers with charts', 'Compare using hundreds first, then tens, then ones'], 'draft', 1),
  ('grade2', 'measurement', 'Measure, compare, and estimate length with standard units.', array['Compare objects by size'], 'Standard measurement uses the same unit every time, such as inches or centimeters. Students measure by lining up the unit carefully and counting how many fit.', array['Use the same unit', 'Start at the zero point', 'Count each unit exactly once'], 'Students learn to use standard units to measure and compare objects.', array['Leaving gaps between units', 'Starting at 1 instead of 0', 'Using different units in one measurement'], array['Model careful alignment', 'Compare before measuring', 'Let students estimate then check'], 'draft', 1),
  ('grade2', 'money', 'Identify coin values and count mixed coin sets.', array['Recognize coins'], 'Money problems use coin values, not just coin count. Students combine coin values to find totals and solve simple shopping situations.', array['Use value, not size', 'Add coin values to find the total'], 'Students learn to count mixed coins and connect coins to their values.', array['Counting coins instead of value', 'Confusing coin names', 'Ignoring the worth of each coin'], array['Use real or play coins', 'Start with single-coin sets', 'Relate coin values to real purchases'], 'draft', 1),
  ('grade2', 'time-telling', 'Tell time to the hour and half-hour and read simple clocks.', array['Recognize numbers on a clock'], 'Time telling links the position of the hands to the time of day. Students read both analog and digital clocks and learn AM and PM for daily routines.', array['Short hand shows the hour', 'Long hand shows minutes', 'AM is before noon; PM is after noon'], 'Students learn to read hour and half-hour times and connect them to daily schedules.', array['Swapping the hands', 'Ignoring the minute hand', 'Confusing AM and PM'], array['Use daily schedule examples', 'Practice with clock models', 'Compare analog and digital times'], 'draft', 1),
  ('grade2', 'geometry', 'Identify shapes by sides, vertices, and solid or flat features.', array['Know basic shapes'], 'Geometry in Grade 2 focuses on shape attributes. Students count sides and vertices, and recognize both 2D and 3D shapes by their properties.', array['Sides and vertices describe shapes', '2D shapes are flat; 3D shapes are solid'], 'Students learn to identify and describe shapes by their attributes.', array['Counting curved edges as sides', 'Mixing up vertices and sides', 'Assuming all shapes with the same name look identical'], array['Sort shapes by attribute', 'Trace sides with fingers', 'Use simple shape charts'], 'draft', 1),
  ('grade2', 'time-five-minutes', 'Read time in five-minute intervals and connect it to the clock face.', array['Know hour and half-hour times'], 'Five-minute time is read by moving around the clock in groups of 5. Students practice counting by fives and identifying quarter past and quarter to.', array['Each number on the clock can mark 5 minutes', 'Quarter past = 15 minutes', 'Quarter to = 45 minutes'], 'Students learn to tell time in 5-minute steps and recognize quarter-hour times.', array['Counting by ones instead of fives', 'Forgetting the hour changes near :45', 'Reading the minute hand too loosely'], array['Count by fives together', 'Use labeled clocks at first', 'Compare times on number lines and clocks'], 'draft', 1),
  ('grade2', 'fluency-20', 'Add and subtract within 20 with accuracy and growing speed.', array['Count to 20'], 'Fluency means solving facts accurately and efficiently. Students use strategies like making ten, counting on, and related facts until answers become quick and reliable.', array['Use efficient strategies', 'Accuracy comes before speed', 'Facts within 20 should be automatic over time'], 'Students build speed and accuracy with addition and subtraction facts within 20.', array['Rushing and making errors', 'Counting from 1 every time', 'Ignoring strategy practice'], array['Mix timed and untimed practice', 'Encourage strategy talk', 'Review facts in short bursts'], 'draft', 1),
  ('grade2', 'standard-measurement', 'Measure lengths using inches and centimeters and compare results.', array['Compare lengths'], 'Standard measurement uses agreed units. Students estimate, measure, and compare lengths with rulers or measuring tools.', array['Start at zero', 'Keep the ruler straight', 'Use the same unit for both objects'], 'Students learn to measure with standard units and compare their results.', array['Starting at the ruler edge instead of zero', 'Mixing inches and centimeters', 'Reading the wrong mark'], array['Demonstrate ruler use carefully', 'Let students estimate first', 'Compare several classroom items'], 'draft', 1),
  ('grade2', 'money-word-problems', 'Solve money stories by adding, subtracting, comparing, and making change.', array['Know coin values'], 'Money word problems require students to think about the cost, the amount paid, and the change left over. The key is to track values carefully.', array['Use coin values', 'Compare total cost to money available'], 'Students learn to solve shopping-style money problems using addition and subtraction.', array['Counting coins but not value', 'Forgetting to subtract change', 'Not matching the story to the question'], array['Use pretend purchases', 'Write money amounts clearly', 'Ask how much is left or needed'], 'draft', 1),
  ('grade2', 'arrays', 'Understand arrays as rows and columns of equal groups.', array['Count equal groups'], 'An array organizes objects in rows and columns. Students see arrays as repeated addition and a bridge toward multiplication.', array['Rows go across', 'Columns go down', 'Equal groups make arrays'], 'Students learn to build and read arrays as structured groups.', array['Mixing up rows and columns', 'Uneven spacing in the array', 'Counting one row twice'], array['Use counters or stickers', 'Label rows and columns', 'Connect arrays to skip counting'], 'draft', 1),
  ('grade2', 'repeated-addition', 'Use repeated addition to find totals in equal groups.', array['Add small numbers'], 'Repeated addition adds the same number again and again. Students learn to write expressions like 3 + 3 + 3 and connect them to equal groups.', array['Each group has the same size', 'Repeated addition leads to multiplication'], 'Students learn to count equal groups by adding the same amount repeatedly.', array['Changing group sizes mid-problem', 'Skipping a group', 'Not seeing the link to multiplication'], array['Start with pictures and counters', 'Say the group size aloud', 'Show how the pattern repeats'], 'draft', 1)
on conflict (grade_id, topic_id) do update set
  learning_goal = excluded.learning_goal,
  prerequisites = excluded.prerequisites,
  core_explanation = excluded.core_explanation,
  key_rules = excluded.key_rules,
  summary = excluded.summary,
  common_mistakes = excluded.common_mistakes,
  teaching_tips = excluded.teaching_tips,
  version = math_concept_pages.version + 1,
  updated_at = now();
