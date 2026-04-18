-- Seed Grade 6 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade6', 'Grade 6', 'Navigate ratios, algebra, and financial mathematics!', 10, 'blue', '🦀', 6, 'published')
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
  ('ratios', 'grade6', 'Crab Ratio Calculations', 'Master ratios and proportions!', '🦀', 'advanced', 'ratios', 1, 'published'),
  ('rates-unit-rates', 'grade6', 'Ocean Speed Calculations', 'Master rates and unit rates!', '⚡', 'advanced', 'ratios', 2, 'published'),
  ('negative-numbers', 'grade6', 'Negative Number Depths', 'Explore numbers below sea level!', '🌡️', 'advanced', 'numbers', 3, 'published'),
  ('integer-operations', 'grade6', 'Deep Sea Integers', 'Master positive and negative numbers!', '🌡️', 'advanced', 'numbers', 4, 'published'),
  ('algebra-expressions', 'grade6', 'Algebraic Ocean Expressions', 'Introduce variables and expressions!', '📝', 'advanced', 'algebra', 5, 'published'),
  ('algebraic-expressions', 'grade6', 'Advanced Expression Building', 'Master algebraic expressions and properties!', '📝', 'advanced', 'algebra', 6, 'published'),
  ('algebra-equations', 'grade6', 'Coral Equation Solving', 'Solve algebraic equations with sea variables!', '🪸', 'advanced', 'algebra', 7, 'published'),
  ('commercial-math', 'grade6', 'Sea Merchant Math', 'Master profit, loss, discount, and interest!', '🏪', 'advanced', 'commercial-math', 8, 'published'),
  ('geometry-area', 'grade6', 'Ocean Area Explorer', 'Find areas of complex shapes!', '🔷', 'advanced', 'geometry', 9, 'published'),
  ('surface-area', 'grade6', 'Surface Area Explorers', 'Calculate surface area of 3D shapes!', '📦', 'advanced', 'geometry', 10, 'published'),
  ('circle-geometry', 'grade6', 'Coral Circle Math', 'Explore circles, circumference, and area!', '⭕', 'advanced', 'geometry', 11, 'published'),
  ('statistics-probability', 'grade6', 'Ocean Data Analysis', 'Analyze data and understand probability!', '🎲', 'advanced', 'data', 12, 'published'),
  ('data-graphs', 'grade6', 'Ocean Data Visualization', 'Create and interpret various graphs!', '📈', 'advanced', 'data', 13, 'published'),
  ('probability', 'grade6', 'Crab Probability Games', 'Understand chance and probability!', '🎯', 'advanced', 'data', 14, 'published')
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
  ('grade6', 'ratios', 'Understand and use ratio language to compare quantities.', array['Know multiplication and division'], 'Ratios compare two quantities by showing how much of one thing there is compared with another. Students learn ratio notation, equivalent ratios, and how to use ratios to solve problems.', array['Ratios compare quantities', 'Equivalent ratios keep the same relationship', 'Scale both parts together'], 'Students learn to read, write, and solve ratio problems.', array['Mixing up the order of the ratio', 'Changing only one part of the ratio', 'Ignoring units'], array['Use pictures and tables', 'Talk through the comparison aloud', 'Show equivalent ratios with scaling'], 'draft', 1),
  ('grade6', 'rates-unit-rates', 'Calculate and compare rates and unit rates.', array['Understand ratios'], 'A rate compares two quantities with different units, like miles per hour. A unit rate tells the amount for one unit and helps students compare situations fairly.', array['Rates compare different units', 'Unit rates are per one', 'Use division to find one unit'], 'Students learn to work with rates and unit rates in real contexts.', array['Forgetting the units', 'Dividing the wrong way', 'Not simplifying to one unit'], array['Use travel and shopping examples', 'Label the units clearly', 'Ask what one unit means'], 'draft', 1),
  ('grade6', 'negative-numbers', 'Understand negative numbers and compare them on a number line.', array['Know positive numbers and number lines'], 'Negative numbers represent values below zero. Students compare, order, and use them in everyday contexts like temperature or elevation.', array['Negative numbers are less than zero', 'A number line can extend below zero', 'Absolute value tells distance from zero'], 'Students learn to place and compare negative numbers correctly.', array['Thinking negative numbers are bigger because of the sign', 'Ignoring zero as the midpoint', 'Confusing order on the number line'], array['Use thermometers and elevations', 'Draw number lines with negatives', 'Ask students to explain which is farther from zero'], 'draft', 1),
  ('grade6', 'integer-operations', 'Perform operations with integers in simple contexts.', array['Understand negative numbers'], 'Integer operations combine positive and negative values. Students learn to add, subtract, multiply, and divide integers while keeping track of sign and magnitude.', array['Signs matter', 'Use number lines or counters', 'Absolute value helps with distance'], 'Students learn to calculate with integers and understand the patterns of signs.', array['Ignoring the sign', 'Using the wrong operation order', 'Applying whole-number rules without adjustment'], array['Start with number lines and chips', 'Show patterns with examples', 'Keep the sign rules visible'], 'draft', 1),
  ('grade6', 'algebra-expressions', 'Use variables and write simple algebraic expressions.', array['Know basic arithmetic operations'], 'An expression combines numbers, operations, and variables. Students learn to represent unknown values and evaluate expressions by substituting numbers for variables.', array['Variables stand for numbers', 'Expressions do not have an equals sign', 'Substitute carefully'], 'Students learn to read and build simple algebraic expressions.', array['Treating a variable as a fixed number', 'Adding an equals sign where it does not belong', 'Skipping the order of operations'], array['Use simple story contexts', 'Ask what the variable means', 'Evaluate expressions with actual values'], 'draft', 1),
  ('grade6', 'algebraic-expressions', 'Simplify and evaluate algebraic expressions using properties.', array['Understand variables and expressions'], 'More advanced expressions use distributive, commutative, and associative properties, plus combining like terms. Students simplify expressions and check them by substitution.', array['Distribute multiplication across parentheses', 'Combine like terms', 'Use properties to rewrite expressions'], 'Students learn to simplify more complex algebraic expressions step by step.', array['Combining unlike terms', 'Dropping terms during simplification', 'Forgetting to distribute across every term'], array['Work one property at a time', 'Color-code like terms', 'Use substitution to check answers'], 'draft', 1),
  ('grade6', 'algebra-equations', 'Solve one-step and two-step equations.', array['Understand expressions and inverse operations'], 'Equations say two expressions are equal. Students solve by using inverse operations to isolate the variable and by checking that the solution works.', array['Whatever you do to one side, do to the other', 'Inverse operations undo each other', 'Check by substitution'], 'Students learn to solve equations and write them from simple situations.', array['Doing operations on one side only', 'Forgetting to check the answer', 'Moving terms without changing the balance'], array['Use balance models', 'Keep equations neat and aligned', 'Ask students to verify their solutions'], 'draft', 1),
  ('grade6', 'commercial-math', 'Solve profit, loss, discount, and interest problems.', array['Know percent and money ideas'], 'Commercial math applies arithmetic to buying, selling, and saving. Students compute profit, loss, discounts, commission, and interest in practical situations.', array['Compare cost and selling prices', 'Discount lowers a price', 'Interest grows over time'], 'Students learn to solve money-and-business style problems.', array['Mixing up cost price and selling price', 'Using the wrong percent base', 'Ignoring the time factor'], array['Use shopping stories', 'Write the given values clearly', 'Ask whether the answer is gain or loss'], 'draft', 1),
  ('grade6', 'geometry-area', 'Find the area of triangles, parallelograms, and composite figures.', array['Know rectangle area'], 'Area measures the inside space of a shape. Students extend beyond rectangles to triangles and parallelograms, then combine shapes for composite figures.', array['Area uses square units', 'Base and height matter', 'Composite figures can be split into simpler shapes'], 'Students learn to calculate area in more complex geometric situations.', array['Using perimeter instead of area', 'Choosing the wrong base or height', 'Forgetting to split composite figures'], array['Draw and label shapes first', 'Use grids when possible', 'Ask students to identify the base and height'], 'draft', 1),
  ('grade6', 'surface-area', 'Calculate surface area of prisms and related 3D shapes.', array['Know 2D and 3D shapes'], 'Surface area measures the outside covering of a solid. Students use nets, rectangular faces, and repeated addition to find total surface area.', array['Surface area is the outside of a solid', 'Nets show all faces', 'Add the areas of each face'], 'Students learn to measure the outer surface of 3D shapes.', array['Confusing surface area with volume', 'Leaving out a face in the total', 'Using the wrong unit'], array['Build nets visually', 'Count each face once', 'Compare solids with different dimensions'], 'draft', 1),
  ('grade6', 'circle-geometry', 'Understand circles and calculate circumference and area.', array['Know radius and diameter ideas'], 'Circle geometry focuses on the relationship between radius, diameter, circumference, and area. Students use formulas and visual reasoning to work with circles.', array['Diameter is twice the radius', 'Circumference goes around the circle', 'Area fills the inside of the circle'], 'Students learn the parts of a circle and how to calculate circle measures.', array['Mixing up radius and diameter', 'Using the wrong formula', 'Forgetting that circumference is around the outside'], array['Label circles carefully', 'Use string or rulers for circumference', 'Connect formulas to real circles'], 'draft', 1),
  ('grade6', 'statistics-probability', 'Describe data and make basic probability statements.', array['Know graphs and simple data displays'], 'Statistics helps students summarize data with measures like mean, median, mode, and range. Probability introduces chance and expected outcomes.', array['Mean, median, mode, and range describe data', 'Probability ranges from impossible to certain', 'Data can support predictions'], 'Students learn to describe datasets and reason about chance.', array['Confusing mean and median', 'Treating probability as a guess with no evidence', 'Ignoring the full dataset'], array['Use class data and experiments', 'Compare several summary measures', 'Ask students to justify probability statements'], 'draft', 1),
  ('grade6', 'data-graphs', 'Create and interpret histograms and other data displays.', array['Know basic bar graphs'], 'Different graphs suit different kinds of data. Students read and compare histograms, box plots, and pie charts, then explain what the graphs show.', array['Match the graph type to the data', 'Read labels and scales first', 'Compare distributions carefully'], 'Students learn to interpret more advanced graphs and displays.', array['Reading the scale incorrectly', 'Using the wrong graph type', 'Ignoring what each axis represents'], array['Start with simple class datasets', 'Compare two graphs of the same data', 'Have students explain their reading of the graph'], 'draft', 1),
  ('grade6', 'probability', 'Use simple and compound probability language and reasoning.', array['Understand chance'], 'Probability describes how likely an event is. Students calculate simple probabilities, compare outcomes, and relate experiments to theoretical chance.', array['Probability is between 0 and 1', 'Experimental probability comes from trials', 'Compound events combine outcomes'], 'Students learn to reason about likelihood in real situations.', array['Confusing probability with certainty', 'Not counting all possible outcomes', 'Mixing experimental and theoretical probability'], array['Use coins, spinners, and dice', 'Record outcomes in tables', 'Ask students to explain why an event is likely or unlikely'], 'draft', 1)
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
