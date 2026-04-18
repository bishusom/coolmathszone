-- Seed data for Kindergarten and Grade 1.
-- Run this after supabase/schema.sql.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('kindergarten', 'Kindergarten', 'Counting magic and shape adventures under the sea!', 4, 'pink', '🧜‍♀️', 1, 'published'),
  ('grade1', 'Grade 1', 'Dive into number adventures with ocean friends!', 5, 'blue', '🐬', 2, 'published')
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
  ('counting', 'kindergarten', 'Seashell Counting', 'Learn to count like a mermaid!', '🐚', 'beginner', 'numbers', 1, 'published'),
  ('number-recognition', 'kindergarten', 'Number Treasure Hunt', 'Recognize numbers in ocean treasures!', '⭐', 'beginner', 'numbers', 2, 'published'),
  ('shapes', 'kindergarten', 'Ocean Shape Explorer', 'Discover shapes in the coral reef!', '🔺', 'beginner', 'geometry', 3, 'published'),
  ('comparison', 'kindergarten', 'Sea Creature Comparison', 'Compare sizes and numbers of sea friends!', '⚖️', 'beginner', 'numbers', 4, 'published'),
  ('counting-to-20', 'kindergarten', 'Advanced Seashell Counting', 'Master counting up to 20 with ocean friends!', '🔢', 'beginner', 'numbers', 5, 'published'),
  ('3d-shapes', 'kindergarten', '3D Ocean Shapes', 'Explore 3D shapes in underwater worlds!', '📦', 'beginner', 'geometry', 6, 'published'),
  ('classification', 'kindergarten', 'Sea Creature Sorting', 'Sort and classify ocean treasures!', '🗂️', 'beginner', 'logic', 7, 'published'),
  ('money-recognition', 'kindergarten', 'Coin Treasure', 'Identify coins like pirate treasure!', '🪙', 'beginner', 'money', 8, 'published'),
  ('patterns', 'kindergarten', 'Ocean Patterns', 'Create and extend patterns with sea creatures!', '🎭', 'beginner', 'patterns', 9, 'published'),
  ('ordinal-numbers', 'kindergarten', 'Sea Race Positions', 'Learn first, second, third with sea races!', '🏁', 'beginner', 'numbers', 10, 'published'),

  ('addition', 'grade1', 'Dolphin Addition', 'Add sea treasures with dolphin friends!', '➕', 'beginner', 'arithmetic', 1, 'published'),
  ('subtraction', 'grade1', 'Subtraction Seas', 'Subtract sea treasures!', '➖', 'beginner', 'arithmetic', 2, 'published'),
  ('place-value', 'grade1', 'Pearl Place Value Quest', 'Discover the secret of numbers with pearls!', '💎', 'beginner', 'numbers', 3, 'published'),
  ('measurement', 'grade1', 'Seahorse Measurement', 'Measure ocean treasures with seahorses!', '📏', 'beginner', 'measurement', 4, 'published'),
  ('inverse-operations', 'grade1', 'Dolphin Fact Families', 'Discover how addition and subtraction are connected!', '🔄', 'beginner', 'arithmetic', 5, 'published'),
  ('time-half-hour', 'grade1', 'Tide Time Telling', 'Learn to tell time with ocean clocks!', '⏰', 'beginner', 'time', 6, 'published'),
  ('coin-counting', 'grade1', 'Dolphin Coin Counting', 'Count coins with dolphin friends!', '💰', 'beginner', 'money', 7, 'published'),
  ('time-quarter-hour', 'grade1', 'Tide Quarter Time', 'Tell time to quarter hours!', '🕒', 'beginner', 'time', 8, 'published'),
  ('data-collection', 'grade1', 'Seahorse Data', 'Collect and organize data!', '📋', 'beginner', 'data', 9, 'published')
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
  ('kindergarten', 'counting', 'Build number sense by counting forward, writing numbers, and comparing small groups.', array[]::text[], 'Counting means saying number names in the correct order while matching each number to one object. Students begin with small sets, then extend to larger counting ranges and compare quantities.', array['Say one number for each object', 'The last number said tells how many'], 'Counting helps students build number sense, write numbers, and compare groups.', array['Skipping numbers while counting', 'Pointing to the same object twice', 'Thinking the last number said is the next number, not the total'], array['Use real objects first, then pictures', 'Count daily in short routines', 'Ask students to explain how they know two groups are equal or different'], 'draft', 1),
  ('kindergarten', 'number-recognition', 'Recognize numerals and match them to quantities up to 20.', array['Count small objects'], 'Number recognition connects the written symbol to the amount it represents. Students practice spotting numerals, naming them, and pairing each numeral with the correct set of objects.', array['A numeral is a symbol for a number', 'Numbers and quantities should match'], 'Students learn to identify numerals and connect them to actual sets of objects.', array['Confusing similar-looking digits', 'Counting the objects but ignoring the numeral', 'Matching a numeral to the wrong group size'], array['Mix numeral cards with object cards', 'Use repeated matching games', 'Show numbers in different fonts and contexts'], 'draft', 1),
  ('kindergarten', 'shapes', 'Identify common 2D and 3D shapes and notice their features.', array['Recognize objects and groups'], 'Shapes are the forms of objects. Students learn to name common flat shapes and solid shapes, then look for shapes in pictures and real-world objects.', array['2D shapes are flat', '3D shapes are solid and can be held'], 'Students learn to name and compare basic shapes in pictures and objects.', array['Calling every round object a circle', 'Mixing up flat and solid shapes', 'Ignoring corners and sides'], array['Use classroom and ocean-themed objects', 'Ask students to sort shapes by features', 'Compare shapes side by side'], 'draft', 1),
  ('kindergarten', 'comparison', 'Compare groups and numbers using greater than, less than, and equal to.', array['Count objects reliably'], 'Comparison tells which group has more, fewer, or the same amount. Students use visual matching and counting to decide whether one group is bigger, smaller, or equal.', array['Greater than means more', 'Less than means fewer', 'Equal means the same amount'], 'Students learn to compare quantities and describe the relationship between them.', array['Comparing by size instead of count', 'Using symbols without understanding them', 'Not checking both groups carefully'], array['Start with visible sets before symbols', 'Use matching pairs to compare', 'Always ask students to explain their choice'], 'draft', 1),
  ('kindergarten', 'counting-to-20', 'Count sets to 20, fill in missing numbers, and match numbers to groups.', array['Count to 10'], 'This topic extends counting fluency to larger sets. Students count objects to 20, identify missing numbers in a sequence, and match numerals with groups.', array['Count one object at a time', 'Sequences follow a pattern'], 'Students extend counting fluency and connect numerals to larger sets.', array['Rushing through the sequence', 'Starting in the wrong place', 'Losing track of counted objects'], array['Use counters and ten frames', 'Practice number sequences daily', 'Include missing-number games'], 'draft', 1),
  ('kindergarten', '3d-shapes', 'Identify common 3D shapes and connect them to real objects.', array['Know basic shapes'], '3D shapes have length, width, and height. Students look for cubes, spheres, cylinders, and cones in classroom objects and pictures.', array['3D shapes are solid', 'Real objects can model 3D shapes'], 'Students recognize and compare the properties of common 3D shapes.', array['Confusing the face of a shape with the whole solid', 'Using shape names loosely', 'Not noticing flat faces or curved surfaces'], array['Use hands-on objects', 'Compare 2D and 3D versions', 'Ask students to name real-world matches'], 'draft', 1),
  ('kindergarten', 'classification', 'Sort objects into categories and explain what belongs or does not belong.', array['Observe object features'], 'Classification is the process of grouping things by shared properties. Students sort by color, size, shape, type, or other visible features.', array['Items in a group share a rule', 'One object can belong in more than one group'], 'Students learn to group objects and explain why an item does or does not fit.', array['Sorting by a hidden rule without stating it', 'Assuming only one correct group exists', 'Ignoring the sorting rule when explaining'], array['Use playful sorting sets', 'Ask students to name the rule', 'Encourage more than one possible grouping'], 'draft', 1),
  ('kindergarten', 'money-recognition', 'Recognize U.S. coins and connect each coin to its value.', array['Count small groups'], 'Money recognition starts with identifying pennies, nickels, dimes, and quarters. Students learn the names, appearance, and value of each coin.', array['Each coin type has a name and value', 'Coin value is not the same as coin size'], 'Students learn to identify common coins and understand their values.', array['Confusing coin size with value', 'Mixing up coin names', 'Thinking all coins are worth the same'], array['Use coin sorting activities', 'Compare coins visually and by value', 'Practice with real or realistic play coins'], 'draft', 1),
  ('kindergarten', 'patterns', 'Recognize, copy, extend, and create simple repeating patterns.', array['Notice similarities and differences'], 'A pattern repeats in a predictable way. Students practice AB and ABC patterns, identify the repeating unit, and continue sequences.', array['Patterns repeat in order', 'The repeating part is called the core'], 'Students learn to spot and build repeating patterns.', array['Changing the pattern instead of repeating it', 'Missing the core', 'Extending with the wrong object or color'], array['Use movement, color, and objects', 'Have students clap the pattern aloud', 'Ask them to explain the core'], 'draft', 1),
  ('kindergarten', 'ordinal-numbers', 'Use ordinal words to describe positions in a line or sequence.', array['Count in order'], 'Ordinal numbers tell position rather than quantity. Students learn first through tenth by looking at races, lines, and ordered groups.', array['Ordinal words describe position', 'First is not the same as one in every context'], 'Students learn to describe order using first, second, third, and beyond.', array['Mixing ordinal and cardinal numbers', 'Forgetting that position depends on the order', 'Starting counting at zero in a position question'], array['Use races and lineups', 'Point to each position while naming it', 'Connect ordinal words to familiar routines'], 'draft', 1),

  ('grade1', 'addition', 'Understand addition as putting groups together and solve within 20.', array['Count within 20'], 'Addition combines two or more groups into one total. Students can model addition with objects, drawings, or counting on.', array['Addition joins groups', 'The total is the sum'], 'Students learn to add within 20 using counting and concrete models.', array['Counting every object from 1 each time', 'Ignoring the meaning of the plus sign', 'Miscounting after regrouping objects'], array['Start with small sums and visible objects', 'Use number lines and counters', 'Encourage counting on rather than restarting'], 'draft', 1),
  ('grade1', 'subtraction', 'Understand subtraction as taking apart and solve within 20.', array['Count within 20'], 'Subtraction finds what remains after taking some away. Students model subtraction by removing objects, counting back, or using related facts.', array['Subtraction finds the difference or remainder', 'Take away means the group gets smaller'], 'Students learn to subtract within 20 using objects, pictures, and counting back.', array['Counting the objects that were removed as the answer', 'Confusing the starting number with the result', 'Forgetting the action is taking away'], array['Use physical items students can move', 'Connect subtraction to addition facts', 'Ask what is left after removing some'], 'draft', 1),
  ('grade1', 'place-value', 'Understand tens and ones, read two-digit numbers, and compare them.', array['Count to 100'], 'Place value shows how digits in a number represent tens and ones. Students learn that 14 means 1 ten and 4 ones, not 1 and 4 separately.', array['The left digit in a two-digit number shows tens', 'The right digit shows ones'], 'Students learn how two-digit numbers are built from tens and ones.', array['Reading 14 as one-four', 'Ignoring the tens digit', 'Comparing only the ones digit'], array['Use bundles and sticks or base-ten blocks', 'Compare numbers by tens first', 'Write numbers in standard and expanded form'], 'draft', 1),
  ('grade1', 'measurement', 'Compare and measure length and weight with informal units.', array['Compare visible objects'], 'Measurement compares how long, heavy, or big something is. Students use non-standard units first, then compare two objects and estimate.', array['Use the same unit for a fair comparison', 'Measurement depends on the attribute being measured'], 'Students learn basic length and weight comparison through simple hands-on tasks.', array['Using different-sized units in one measurement', 'Confusing longer with heavier', 'Starting measurement at different points'], array['Use classroom objects like cubes or paper clips', 'Model starting at the same point', 'Let students estimate before measuring'], 'draft', 1),
  ('grade1', 'inverse-operations', 'See addition and subtraction as related facts in a fact family.', array['Know addition and subtraction symbols'], 'Inverse operations undo each other. If 3 + 5 = 8, then 8 - 5 = 3 and 8 - 3 = 5. Students see the same numbers make a family of related facts.', array['Addition and subtraction are inverses', 'Fact families use the same three numbers'], 'Students learn how addition and subtraction are connected through fact families.', array['Treating the facts as unrelated', 'Using the wrong total in the family', 'Forgetting that subtraction starts with the whole'], array['Use triangle fact-family diagrams', 'Show the same objects in both directions', 'Ask students to write all related facts'], 'draft', 1),
  ('grade1', 'time-half-hour', 'Read clocks to the hour and half-hour.', array['Recognize numbers 1 to 12'], 'Time telling connects the position of the hour and minute hands to the spoken time. Students learn o''clock and half past first.', array['Short hand shows the hour', 'Long hand shows minutes'], 'Students learn to read clocks to the hour and half-hour.', array['Swapping the hour and minute hand', 'Ignoring where the hands point', 'Confusing half past with the next hour'], array['Use paper clock models', 'Start with o''clock before half past', 'Practice matching analog and digital times'], 'draft', 1),
  ('grade1', 'coin-counting', 'Count coins and build small amounts using pennies, nickels, and dimes.', array['Recognize coins'], 'Coin counting builds on coin recognition by adding values together. Students count small groups and make simple amounts with play money.', array['Coin values add to a total', 'Use coin values, not just coin count'], 'Students learn to count small groups of coins and make simple amounts.', array['Counting coins without tracking value', 'Mixing up nickels and dimes', 'Adding the number of coins instead of their values'], array['Use real coins or play coins', 'Start with all pennies, then mix in other coins', 'Ask students to explain how they counted'], 'draft', 1),
  ('grade1', 'time-quarter-hour', 'Read and match quarter-hour times on analog and digital clocks.', array['Read times to the hour'], 'Quarter-hour time divides the clock into 15-minute sections. Students practice quarter past and quarter to and connect analog and digital times.', array['A quarter hour is 15 minutes', 'Quarter past and quarter to describe parts of an hour'], 'Students learn to read quarter-hour times and understand 15-minute intervals.', array['Confusing quarter past with quarter to', 'Ignoring the minute hand position', 'Reading the hour hand too literally'], array['Use clock faces with labeled minute marks', 'Compare quarter past and quarter to side by side', 'Practice with both analog and digital clocks'], 'draft', 1),
  ('grade1', 'data-collection', 'Collect, organize, and interpret simple data using tallies and graphs.', array['Count objects and compare groups'], 'Data collection means gathering information, organizing it, and answering questions from the results. Students use tally marks, simple graphs, and picture charts.', array['Each tally mark represents one item', 'Graphs help show and compare information'], 'Students learn to collect and read simple data displays.', array['Skipping a tally or graph count', 'Mixing up categories', 'Answering without checking the data display'], array['Use data from the class itself', 'Keep categories simple', 'Ask students to tell what the graph shows'], 'draft', 1)
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
