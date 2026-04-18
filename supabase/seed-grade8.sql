-- Seed Grade 8 curriculum content.
-- Run after supabase/schema.sql.
-- Topic ids are scoped by grade in the database, so repeated ids across grades are safe.

insert into math_grades (id, title, description, age, color, icon, sort_order, status)
values
  ('grade8', 'Grade 8', 'Master functions, Pythagorean theorem, and geometric transformations!', 12, 'purple', '🐡', 8, 'published')
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
  ('pythagorean-theorem', 'grade8', 'Pythagorean Ocean Explorers', 'Discover the secrets of right triangles with the Pythagorean theorem!', '📐', 'advanced', 'geometry', 1, 'published'),
  ('functions', 'grade8', 'Function Ocean Currents', 'Explore functions as input-output relationships!', '🔄', 'advanced', 'algebra', 2, 'published'),
  ('transformations', 'grade8', 'Geometric Ocean Transformations', 'Master translations, rotations, reflections, and dilations!', '✨', 'advanced', 'geometry', 3, 'published'),
  ('congruence-similarity', 'grade8', 'Coral Congruence and Similarity', 'Explore when shapes are exactly alike or proportionally alike!', '🔺', 'advanced', 'geometry', 4, 'published'),
  ('exponents-roots', 'grade8', 'Exponent Ocean Depths', 'Dive into exponents, square roots, and cube roots!', '⚡', 'advanced', 'algebra', 5, 'published'),
  ('linear-equations', 'grade8', 'Linear Equation Waves', 'Master slope-intercept form and graphing linear equations!', '📈', 'advanced', 'algebra', 6, 'published'),
  ('systems-of-equations', 'grade8', 'System of Equation Seas', 'Solve systems of linear equations!', '⚖️', 'advanced', 'algebra', 7, 'published'),
  ('scientific-notation', 'grade8', 'Scientific Notation Depths', 'Work with very large and very small numbers!', '🔬', 'advanced', 'numbers', 8, 'published'),
  ('volume-3d-shapes', 'grade8', '3D Ocean Volume', 'Calculate volume of cylinders, cones, and spheres!', '🎱', 'advanced', 'geometry', 9, 'published'),
  ('bivariate-data', 'grade8', 'Ocean Data Patterns', 'Analyze relationships between two variables!', '📊', 'advanced', 'data', 10, 'published'),
  ('angle-relationships', 'grade8', 'Advanced Angle Relationships', 'Explore angles in parallel lines and triangles!', '📐', 'advanced', 'geometry', 11, 'published'),
  ('real-numbers', 'grade8', 'Real Number Ocean', 'Explore rational and irrational numbers!', '🔢', 'advanced', 'numbers', 12, 'published')
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
  ('grade8', 'pythagorean-theorem', 'Use the Pythagorean theorem to find missing sides in right triangles.', array['Know squares and square roots'], 'The Pythagorean theorem links the side lengths of a right triangle: the two shorter sides and the longest side. Students use the relationship to find missing sides and check whether a triangle is right.', array['Use only right triangles', 'a^2 + b^2 = c^2', 'c is the longest side'], 'Students learn to solve right triangle problems using the Pythagorean theorem.', array['Using the theorem on non-right triangles', 'Choosing the wrong side as c', 'Forgetting to square the side lengths'], array['Label the triangle first', 'Use diagrams and calculators carefully', 'Ask students to explain why the theorem applies'], 'draft', 1),
  ('grade8', 'functions', 'Understand functions as input-output rules and use function notation.', array['Know ordered pairs and variables'], 'A function is a rule that gives exactly one output for each input. Students use function tables, graphs, and notation like f(x) to describe relationships.', array['Each input has one output', 'Function notation names the rule', 'Tables and graphs can show the same function'], 'Students learn to identify, represent, and evaluate functions.', array['Thinking every relation is a function', 'Mixing up input and output', 'Ignoring domain and range'], array['Use tables and graphs together', 'Start with simple patterns', 'Ask students to describe the rule in words'], 'draft', 1),
  ('grade8', 'transformations', 'Perform and describe geometric transformations.', array['Know basic shapes and coordinates'], 'Transformations move a shape without changing its size or shape in a rigid motion, or they can resize it with a dilation. Students learn to describe slides, turns, flips, and scale changes.', array['Translations slide', 'Rotations turn', 'Reflections flip', 'Dilations change size'], 'Students learn to move and resize shapes using precise geometric language.', array['Mixing up rotation and reflection', 'Forgetting the center of rotation', 'Assuming a dilation keeps size the same'], array['Use tracing paper and grids', 'Name the transformation before drawing it', 'Have students describe the motion aloud'], 'draft', 1),
  ('grade8', 'congruence-similarity', 'Identify congruent and similar figures and justify why.', array['Know transformations and ratios'], 'Congruent figures match exactly in size and shape, while similar figures have the same shape but different sizes. Students use transformations and scale factors to justify the relationship.', array['Congruent means same size and shape', 'Similar means same shape', 'Scale factor compares corresponding sides'], 'Students learn to compare figures and explain why they are congruent or similar.', array['Calling every same-looking shape congruent', 'Confusing similarity with equality', 'Using the wrong scale factor'], array['Overlay shapes when possible', 'Compare corresponding sides carefully', 'Ask students to justify their claim'], 'draft', 1),
  ('grade8', 'exponents-roots', 'Use exponent rules and square or cube roots in calculations.', array['Know multiplication and square numbers'], 'Exponents show repeated multiplication, and roots undo that process. Students apply exponent rules and solve simple equations involving powers and roots.', array['Exponents show repeated multiplication', 'Square roots and cube roots undo powers', 'Estimate when exact values are not obvious'], 'Students learn to work with powers and roots in number and geometry problems.', array['Treating exponents as multiplication by the base', 'Forgetting that roots are inverse operations', 'Ignoring the order of operations'], array['Start with patterns in powers', 'Use calculators only after estimating', 'Connect roots to perfect squares and cubes'], 'draft', 1),
  ('grade8', 'linear-equations', 'Graph and interpret linear equations using slope and intercept.', array['Know coordinate graphs and algebraic expressions'], 'A linear equation describes a straight-line relationship. Students graph lines, find slope and intercept, and write equations from graphs or situations.', array['Slope is rate of change', 'The y-intercept is where the line crosses the y-axis', 'Linear equations make straight lines'], 'Students learn to represent and interpret straight-line relationships.', array['Mixing up slope and intercept', 'Plotting points in the wrong order', 'Using the wrong scale on the graph'], array['Use graph paper and tables', 'Find slope from rise over run', 'Have students explain the meaning of the line'], 'draft', 1),
  ('grade8', 'systems-of-equations', 'Solve systems of linear equations using multiple methods.', array['Know linear equations'], 'A system is a set of equations that must all be true at the same time. Students solve systems by graphing, substitution, and elimination, then interpret the solution in context.', array['The solution satisfies all equations', 'Systems can have one, none, or infinitely many solutions', 'Different methods can lead to the same answer'], 'Students learn to solve and interpret systems of equations.', array['Stopping after solving only one equation', 'Mixing up substitution and elimination steps', 'Misreading the graph'], array['Check the solution in every equation', 'Use organized steps for each method', 'Ask students what the solution means in context'], 'draft', 1),
  ('grade8', 'scientific-notation', 'Read, write, and calculate with scientific notation.', array['Know powers of ten'], 'Scientific notation rewrites very large or very small numbers as a number between 1 and 10 times a power of ten. Students convert, compare, and calculate with these forms.', array['The number before the power of ten is between 1 and 10', 'Powers of ten move the decimal', 'Scientific notation makes large numbers manageable'], 'Students learn to work with big and small numbers efficiently.', array['Forgetting to move the decimal correctly', 'Using a number outside the 1 to 10 range', 'Ignoring the power of ten'], array['Practice moving the decimal one step at a time', 'Compare scientific and standard form', 'Use real-world measurement examples'], 'draft', 1),
  ('grade8', 'volume-3d-shapes', 'Calculate volume of cylinders, cones, and spheres.', array['Know area and volume basics'], 'Volume measures the space inside a 3D figure. Students use formulas for cylinders, cones, and spheres, and connect those formulas to the shapes’ structure.', array['Volume measures inside space', 'Use the correct formula for each shape', 'Keep units cubic'], 'Students learn to calculate and compare the volume of common 3D shapes.', array['Mixing area with volume', 'Using the wrong formula for the shape', 'Forgetting cubic units'], array['Compare the shape to a prism or stacked layers', 'Label radius and height clearly', 'Ask students to estimate before calculating'], 'draft', 1),
  ('grade8', 'bivariate-data', 'Analyze relationships between two variables using scatter plots.', array['Know graphs and trends'], 'Bivariate data looks at two related variables. Students create scatter plots, describe correlation, and use lines of best fit to make predictions.', array['Scatter plots show pairs of values', 'Correlation can be positive, negative, or none', 'Lines of best fit help predict trends'], 'Students learn to describe and analyze relationships between two variables.', array['Calling every pattern a strong correlation', 'Confusing causation with correlation', 'Ignoring the scale of the graph'], array['Use real paired data', 'Ask what the graph suggests', 'Have students describe the overall trend'], 'draft', 1),
  ('grade8', 'angle-relationships', 'Solve angle problems using parallel lines, transversals, and triangles.', array['Know angle basics and triangle sum'], 'Angle relationships follow fixed rules in geometric figures. Students use complementary, supplementary, vertical, and corresponding angles to solve problems.', array['Complementary angles add to 90 degrees', 'Supplementary angles add to 180 degrees', 'Vertical and corresponding angles have matching measures'], 'Students learn to reason about angle relationships in complex figures.', array['Using the wrong pair of angles', 'Forgetting the properties of parallel lines', 'Adding angles that do not form a straight line'], array['Color-code related angles', 'Draw and label all known values', 'Ask students to justify each step'], 'draft', 1),
  ('grade8', 'real-numbers', 'Classify and compare rational and irrational numbers.', array['Know fractions, decimals, and square roots'], 'The real number system includes rational and irrational numbers. Students classify numbers, compare values, and estimate irrational numbers in context.', array['Rational numbers can be written as fractions or terminating/repeating decimals', 'Irrational numbers do not terminate or repeat', 'Real numbers include all rational and irrational numbers'], 'Students learn to classify and compare numbers in the real number system.', array['Thinking all decimals are rational without checking repetition', 'Confusing rational with integer', 'Ignoring estimate when exact form is not available'], array['Use number lines and examples', 'Compare approximate values', 'Ask students to explain why a number fits a category'], 'draft', 1)
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
