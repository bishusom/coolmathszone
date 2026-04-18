-- Seed Grade 5 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade5', 'Grade 5', 'Master the ocean of operations, fractions, and real-world math!', 9, 'orange', '🦈', 5, 'published')
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
  ('fractions', 'grade5', 'Fraction Currents', 'Navigate fraction operations!', '🌊', 'advanced', 'fractions', 1, 'published'),
  ('volume', 'grade5', 'Volume Voyage', 'Explore volume in underwater worlds!', '📦', 'advanced', 'measurement', 2, 'published'),
  ('coordinates', 'grade5', 'Coordinate Ocean', 'Graph points on the coordinate sea!', '🗺️', 'advanced', 'geometry', 3, 'published'),
  ('word-problems', 'grade5', 'Advanced Word Problems', 'Solve complex ocean challenges!', '🤔', 'advanced', 'problem-solving', 4, 'published'),
  ('percentage', 'grade5', 'Percentage Pirates', 'Master percentages with pirate treasure!', '🏴‍☠️', 'advanced', 'commercial-math', 5, 'published'),
  ('profit-loss', 'grade5', 'Treasure Trade', 'Learn profit and loss with sea merchants!', '💰', 'advanced', 'commercial-math', 6, 'published'),
  ('simple-interest', 'grade5', 'Interest Islands', 'Calculate simple interest on treasure!', '🏝️', 'advanced', 'commercial-math', 7, 'published'),
  ('average-mean', 'grade5', 'Average Ocean Depths', 'Find averages of sea measurements!', '📏', 'advanced', 'data', 8, 'published'),
  ('ratio-proportion', 'grade5', 'Coral Ratio Reef', 'Explore ratios and proportions in coral!', '🪸', 'advanced', 'ratios', 9, 'published'),
  ('hcf-lcm', 'grade5', 'Prime Factor Fish', 'Find HCF and LCM with prime factors!', '🐟', 'advanced', 'numbers', 10, 'published'),
  ('decimal-operations', 'grade5', 'Decimal Ocean Currents', 'Master all decimal operations!', '💨', 'advanced', 'decimals', 11, 'published'),
  ('unitary-method', 'grade5', 'Unitary Method Whales', 'Solve problems using unitary method!', '🐋', 'advanced', 'commercial-math', 12, 'published')
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
  ('grade5', 'fractions', 'Add, subtract, multiply, and divide fractions in simple situations.', array['Understand fractions as equal parts'], 'Grade 5 fraction work focuses on operations with unlike denominators, multiplying and dividing fractions, and connecting fractions to division and real-world problems.', array['Find common denominators when needed', 'Fractions can represent division', 'Use models to check reasonableness'], 'Students learn to work flexibly with fraction operations and comparisons.', array['Adding denominators directly', 'Forgetting to simplify when possible', 'Not checking the size of the whole'], array['Use fraction bars and number lines', 'Relate fractions to division', 'Ask students to explain the size of the pieces'], 'draft', 1),
  ('grade5', 'volume', 'Understand and calculate volume of rectangular prisms.', array['Know length, width, and height'], 'Volume measures how much space a 3D shape fills. Students count unit cubes, use multiplication, and connect volume to repeated layers.', array['Volume counts cubic units', 'Rectangular prisms can be found with length times width times height', 'Layers help build understanding'], 'Students learn to find volume in concrete and symbolic ways.', array['Confusing volume with surface area', 'Counting only one layer', 'Using the wrong unit'], array['Build with cubes', 'Show layers clearly', 'Compare prisms with different dimensions'], 'draft', 1),
  ('grade5', 'coordinates', 'Plot and interpret points on a coordinate plane.', array['Know ordered pairs and axes'], 'Coordinates locate points by moving along the x-axis and then the y-axis. Students plot points, read positions, and solve simple real-world mapping tasks.', array['Move across then up', 'Ordered pairs use x then y', 'Axes help locate points'], 'Students learn to read and plot coordinates in the first quadrant.', array['Switching x and y', 'Counting grid lines incorrectly', 'Ignoring the origin'], array['Use graph paper', 'Model the order of moves', 'Ask students to describe the path'], 'draft', 1),
  ('grade5', 'word-problems', 'Solve complex multi-step word problems.', array['Know the four operations'], 'Advanced word problems often need several operations and careful reading. Students decide what is known, what is needed, and which steps come first.', array['Read the whole problem', 'Break it into steps', 'Check the final answer'], 'Students learn to solve challenging problems from real situations.', array['Doing steps out of order', 'Stopping after the first calculation', 'Ignoring units or context'], array['Use bar models and drawings', 'Underline key numbers', 'Have students explain each step'], 'draft', 1),
  ('grade5', 'percentage', 'Understand percent as parts per hundred and connect it to fractions and decimals.', array['Know decimals and fractions'], 'Percent means out of 100. Students convert between percent, decimal, and fraction forms and solve simple percent problems.', array['Percent means per hundred', 'Convert using hundredths', 'Use models to compare forms'], 'Students learn the meaning of percent and how to use it in simple contexts.', array['Treating percent as a whole number only', 'Forgetting the percent symbol', 'Confusing percent with points'], array['Use hundred grids', 'Relate to money and discounts', 'Practice conversion tables'], 'draft', 1),
  ('grade5', 'profit-loss', 'Calculate profit, loss, and related percentages.', array['Know subtraction and percent basics'], 'Profit and loss compare what was paid with what was earned or sold. Students calculate the difference and interpret whether a business gained or lost money.', array['Profit means gain', 'Loss means a negative difference', 'Compare cost price and selling price'], 'Students learn to solve simple business math problems.', array['Mixing up profit and loss', 'Using the wrong price in the formula', 'Ignoring the unit of money'], array['Use store and market examples', 'Write the buying and selling prices clearly', 'Ask if the result is gain or loss'], 'draft', 1),
  ('grade5', 'simple-interest', 'Calculate simple interest over time.', array['Know multiplication and money'], 'Simple interest is found by multiplying principal, rate, and time in a predictable way. Students learn the formula and apply it to short word problems.', array['Interest depends on principal, rate, and time', 'Use the same time units', 'Check that the result makes sense'], 'Students learn to calculate basic interest in practical situations.', array['Mixing up principal and interest', 'Using different time units', 'Forgetting the rate is usually a percent'], array['Start with very small examples', 'Label P, R, and T clearly', 'Connect to saving money stories'], 'draft', 1),
  ('grade5', 'average-mean', 'Find and interpret the mean of a set of numbers.', array['Add and divide numbers'], 'The mean is a fair-share value. Students add the numbers in a set and divide by how many numbers there are.', array['Mean = sum divided by count', 'The answer should be in the same units as the data'], 'Students learn to calculate and interpret simple averages.', array['Forgetting to divide by the number of values', 'Using median when asked for mean', 'Ignoring outliers without checking'], array['Use data from the class', 'Show the balance idea visually', 'Ask what the average tells us'], 'draft', 1),
  ('grade5', 'ratio-proportion', 'Use ratio and proportion reasoning to compare quantities.', array['Know multiplication and division'], 'Ratios compare two quantities, and proportions say two ratios are equal. Students use tables, scaling, and reasoning to solve ratio problems.', array['Ratios compare quantities', 'Equivalent ratios keep the same relationship', 'Scale both parts by the same factor'], 'Students learn to describe and solve proportional relationships.', array['Changing only one part of the ratio', 'Mixing up ratio order', 'Ignoring units'], array['Use double number lines', 'Keep ratio language consistent', 'Ask students to scale both quantities'], 'draft', 1),
  ('grade5', 'hcf-lcm', 'Find highest common factor and least common multiple.', array['Know factors and multiples'], 'HCF and LCM help describe shared factors and shared multiples. Students use factor lists, prime factors, and patterns to find them.', array['HCF comes from factors', 'LCM comes from multiples', 'Prime factorization can help'], 'Students learn to find common factors and common multiples efficiently.', array['Confusing HCF and LCM', 'Missing factor pairs', 'Stopping too early in the list'], array['Use factor trees', 'Compare lists side by side', 'Practice with small numbers first'], 'draft', 1),
  ('grade5', 'decimal-operations', 'Add, subtract, multiply, and divide decimals.', array['Know decimal place value'], 'Decimal operations extend whole-number procedures into tenths and hundredths. Students align decimal points, estimate first, and check that answers are reasonable.', array['Line up decimal points for addition and subtraction', 'Estimate before calculating', 'Keep units clear'], 'Students learn to work accurately with decimal numbers in operations and word problems.', array['Misaligning decimal places', 'Ignoring place value after the decimal', 'Forgetting to estimate'], array['Use money examples', 'Show decimals on place value charts', 'Compare exact and estimated answers'], 'draft', 1),
  ('grade5', 'unitary-method', 'Solve problems by finding the value of one unit first.', array['Know division and multiplication'], 'The unitary method solves ratio or comparison problems by finding the value of one part first, then scaling up to the full amount.', array['Find one unit first', 'Multiply to scale up', 'Use consistent units'], 'Students learn a reliable step-by-step method for ratio and quantity problems.', array['Scaling before finding one unit', 'Using the wrong multiplier', 'Ignoring the context'], array['Use simple real-life examples', 'Show the one-unit step clearly', 'Have students write the chain of reasoning'], 'draft', 1)
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
