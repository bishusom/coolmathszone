-- Seed Grade 7 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade7', 'Grade 7', 'Master rational numbers, advanced geometry, and probability!', 11, 'teal', '🐙', 7, 'published')
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
  ('rational-numbers', 'grade7', 'Rational Number Reef', 'Explore positive and negative rational numbers!', '🧮', 'advanced', 'numbers', 1, 'published'),
  ('algebraic-expressions', 'grade7', 'Algebraic Ocean Expressions', 'Master advanced algebraic expressions!', '📝', 'advanced', 'algebra', 2, 'published'),
  ('equations-inequalities', 'grade7', 'Equation and Inequality Depths', 'Solve complex equations and inequalities!', '⚖️', 'advanced', 'algebra', 3, 'published'),
  ('ratio-proportions', 'grade7', 'Coral Ratio Proportions', 'Master proportional relationships!', '🪸', 'advanced', 'ratios', 4, 'published'),
  ('percent-applications', 'grade7', 'Deep Sea Percentages', 'Apply percentages to real-world scenarios!', '📊', 'advanced', 'commercial-math', 5, 'published'),
  ('geometry-area', 'grade7', 'Ocean Area Explorer', 'Calculate areas of complex shapes!', '🔷', 'advanced', 'geometry', 6, 'published'),
  ('surface-area-volume', 'grade7', '3D Shape Surface and Volume', 'Master surface area and volume calculations!', '📦', 'advanced', 'geometry', 7, 'published'),
  ('circle-geometry', 'grade7', 'Coral Circle Mathematics', 'Explore circles, circumference, and area!', '⭕', 'advanced', 'geometry', 8, 'published'),
  ('angle-relationships', 'grade7', 'Angle Relationship Currents', 'Discover angle relationships and properties!', '📐', 'advanced', 'geometry', 9, 'published'),
  ('probability', 'grade7', 'Probability Pirates', 'Master probability concepts and calculations!', '🎲', 'advanced', 'data', 10, 'published'),
  ('statistics', 'grade7', 'Ocean Data Statistics', 'Analyze and interpret statistical data!', '📈', 'advanced', 'data', 11, 'published'),
  ('scale-drawings', 'grade7', 'Treasure Map Scale Drawings', 'Work with scale factors and proportional drawings!', '🗺️', 'advanced', 'geometry', 12, 'published'),
  ('integer-operations', 'grade7', 'Deep Sea Integer Operations', 'Master operations with positive and negative numbers!', '🌡️', 'advanced', 'numbers', 13, 'published'),
  ('multi-step-problems', 'grade7', 'Multi-Step Ocean Challenges', 'Solve complex multi-step word problems!', '🤿', 'advanced', 'problem-solving', 14, 'published')
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
  ('grade7', 'rational-numbers', 'Understand and use rational numbers in a variety of contexts.', array['Know fractions and integers'], 'Rational numbers include fractions, decimals, and integers. Students learn to add, subtract, multiply, and divide rational numbers and to convert between common forms.', array['Rational numbers can be written in different forms', 'A fraction and a decimal can represent the same value', 'Use number lines to compare values'], 'Students learn to work flexibly with rational numbers and convert between representations.', array['Treating every decimal as larger than every fraction', 'Ignoring sign when comparing', 'Using the wrong form for the context'], array['Use number lines and fraction strips', 'Show the same value in multiple forms', 'Ask students to explain why two forms match'], 'draft', 1),
  ('grade7', 'algebraic-expressions', 'Simplify and evaluate more complex algebraic expressions.', array['Know variables and simple expressions'], 'Students combine like terms, use the distributive property, and evaluate expressions with more than one variable or operation. The goal is to rewrite expressions in easier forms without changing their value.', array['Like terms can be combined', 'Distribution multiplies across parentheses', 'Variables stand for numbers'], 'Students learn to simplify and evaluate algebraic expressions with confidence.', array['Combining unlike terms', 'Dropping a term while simplifying', 'Forgetting to substitute carefully'], array['Color-code like terms', 'Work step by step', 'Check with substitution when possible'], 'draft', 1),
  ('grade7', 'equations-inequalities', 'Solve equations and inequalities and interpret solutions.', array['Know inverse operations'], 'Equations say two expressions are equal, while inequalities compare expressions that are not equal. Students solve and graph them, and interpret whether a solution is greater than or less than a value.', array['Keep both sides balanced in equations', 'Inequalities can have ranges of solutions', 'Graph solutions on a number line'], 'Students learn to solve and graph equations and inequalities in context.', array['Changing the inequality sign when not needed', 'Solving only part of the expression', 'Forgetting to check the solution range'], array['Use balance models for equations', 'Use number lines for inequalities', 'Ask students to describe the solution in words'], 'draft', 1),
  ('grade7', 'ratio-proportions', 'Solve proportional reasoning problems with ratios and rates.', array['Know ratios and unit rates'], 'Proportions state that two ratios are equal. Students use tables, double number lines, and equations to reason about proportional relationships and scale factors.', array['Equivalent ratios keep the same relationship', 'Scale both quantities together', 'Unit rates help compare situations fairly'], 'Students learn to solve ratio and proportion problems in real contexts.', array['Changing only one part of a ratio', 'Mixing up order in a ratio', 'Ignoring the units'], array['Use tables and double number lines', 'Keep ratio language consistent', 'Ask students to explain the scaling factor'], 'draft', 1),
  ('grade7', 'percent-applications', 'Apply percentages to real-world situations.', array['Know fractions, decimals, and basic percent'], 'Percent problems use 100 as the whole. Students calculate percent increase and decrease, taxes, tips, and discounts, then interpret the meaning of the result.', array['Percent means out of 100', 'Increase and decrease compare to a starting value', 'Context matters in word problems'], 'Students learn to use percentages in practical and financial situations.', array['Using the wrong starting amount', 'Confusing percent increase with percent of', 'Ignoring the context'], array['Relate percent to 100-grid models', 'Use shopping and money examples', 'Ask whether the amount goes up or down'], 'draft', 1),
  ('grade7', 'geometry-area', 'Find areas of triangles, parallelograms, and composite figures.', array['Know rectangle area'], 'Area formulas extend beyond rectangles. Students use base and height for triangles and parallelograms, and split composite figures into simpler shapes.', array['Area measures inside space', 'Base and height must match', 'Composite figures can be broken apart'], 'Students learn to calculate area in more advanced geometric problems.', array['Using perimeter instead of area', 'Choosing the wrong base or height', 'Forgetting to split complex shapes'], array['Draw and label shapes clearly', 'Use grids when possible', 'Ask students to identify the base and height'], 'draft', 1),
  ('grade7', 'surface-area-volume', 'Calculate surface area and volume of prisms and pyramids.', array['Know 3D shapes and area'], 'Surface area measures the outside of a solid, and volume measures the space inside it. Students connect formulas to nets, layers, and rectangular and triangular prisms.', array['Surface area is outside', 'Volume is inside', 'Nets help show faces clearly'], 'Students learn to distinguish and calculate surface area and volume.', array['Mixing up surface area and volume', 'Leaving out a face', 'Using the wrong unit'], array['Use nets and cube models', 'Label faces and dimensions', 'Ask students to explain which measure is needed'], 'draft', 1),
  ('grade7', 'circle-geometry', 'Understand and calculate circle measures.', array['Know radius and diameter'], 'Circle geometry uses radius, diameter, circumference, and area. Students use formulas and visual reasoning to solve circle problems.', array['Diameter is twice the radius', 'Circumference goes around the circle', 'Area fills the circle'], 'Students learn the parts of circles and how to calculate their measures.', array['Mixing up radius and diameter', 'Using the wrong formula', 'Forgetting that circumference is around the outside'], array['Label circles carefully', 'Use string or flexible rulers', 'Connect formulas to real circles'], 'draft', 1),
  ('grade7', 'angle-relationships', 'Analyze angle relationships in geometric figures.', array['Know basic angle ideas'], 'Angles on lines and triangles relate in predictable ways. Students use complementary, supplementary, and vertical angle relationships, plus angle properties with transversals.', array['Complementary angles add to 90 degrees', 'Supplementary angles add to 180 degrees', 'Vertical angles are equal'], 'Students learn to reason about angle relationships and solve problems with them.', array['Using the wrong angle pair', 'Adding angles without checking the relationship', 'Ignoring line structure'], array['Draw and label angle pairs', 'Use color to mark relationships', 'Have students explain why the angles match'], 'draft', 1),
  ('grade7', 'probability', 'Reason about simple and compound probability.', array['Know fractions and ratios'], 'Probability measures how likely an event is. Students compare theoretical and experimental probability and use chance language to describe outcomes.', array['Probability is between 0 and 1', 'Experimental probability comes from trials', 'Compound events combine outcomes'], 'Students learn to describe and calculate probability in real situations.', array['Confusing likely with certain', 'Not counting all outcomes', 'Mixing theoretical and experimental results'], array['Use coins, spinners, and dice', 'Record outcomes in tables', 'Ask students to explain the chance'], 'draft', 1),
  ('grade7', 'statistics', 'Analyze data using summary measures and displays.', array['Know graphs and averages'], 'Statistics helps students summarize data with measures like mean, median, mode, and range, then interpret variability and patterns in graphs.', array['Mean, median, mode, and range describe data', 'Graphs help display patterns', 'Data can support inferences'], 'Students learn to read, summarize, and interpret datasets.', array['Confusing mean and median', 'Ignoring spread or variability', 'Reading a graph without the labels'], array['Use class or survey data', 'Compare multiple summary measures', 'Ask students to justify conclusions'], 'draft', 1),
  ('grade7', 'scale-drawings', 'Use scale factors to create and interpret drawings.', array['Know ratios and proportions'], 'Scale drawings represent real objects at a different size but with the same proportions. Students use scale factors to enlarge or shrink figures and solve related problems.', array['Scale factor changes size proportionally', 'Corresponding sides stay in proportion', 'Use consistent units'], 'Students learn to work with scale models and drawings.', array['Scaling only one side', 'Using mismatched units', 'Forgetting the real-world meaning'], array['Start with simple maps', 'Label scale factors clearly', 'Have students explain the enlargement or reduction'], 'draft', 1),
  ('grade7', 'integer-operations', 'Perform operations with integers and understand their patterns.', array['Know positive and negative numbers'], 'Integer operations extend arithmetic to positive and negative numbers. Students use number lines, counters, and rules to add, subtract, multiply, and divide integers.', array['Signs matter', 'Number lines show movement', 'Use patterns to reason about signs'], 'Students learn to calculate with integers in a variety of situations.', array['Ignoring the sign', 'Applying whole-number rules only', 'Using the wrong direction on a number line'], array['Use chips and number lines', 'Show sign patterns clearly', 'Practice with real-world contexts'], 'draft', 1),
  ('grade7', 'multi-step-problems', 'Solve multi-step word problems using rational numbers and algebraic thinking.', array['Know the four operations'], 'Multi-step problems require careful reading, deciding the order of operations, and checking whether the answer makes sense. Students use estimation and algebraic reasoning to organize their work.', array['Read the whole problem', 'Solve one step at a time', 'Check reasonableness'], 'Students learn to solve complex problems by breaking them into smaller steps.', array['Doing the steps in the wrong order', 'Stopping after one operation', 'Ignoring units or context'], array['Underline key information', 'Model steps on paper', 'Ask students to explain the process'], 'draft', 1)
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
