USE moEnterprise;
 
INSERT INTO department
    (dep_name)
VALUES 
    ('Product'),
    ('Sales'),
    ('Legal'),
    ('Accounting');

INSERT INTO role_table
(title, salary, department_id)
VALUES
  ('Sr Engineer', 180000.00, 1),
  ('Jr Engineer', 110000.00, 1),
  ('Account Manager', 90000.00, 2),
  ('Business Development Rep', 70000.00, 2),
  ('Lawyer', 100000.00, 3),
  ('Clerk', 65000.00, 3),
  ('Controller', 150000.00, 4),
  ('Accountant', 100000.00, 4);



INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Mario', 'Bro', 1, 1 ),
  ('Luigi', 'Bro', 2, NULL ),
  ('Donkey', 'Kong', 3, NULL ),
  ('Captain', 'Falcon', 4, 3 ),
  ('Pac', 'Man', 5, NULL),
  ('Bowser', 'Jr.', 6, 5),
  ('Dark', 'Samus', 1, 4),
  ('Star', 'Fox', 7, NULL),
  ('Peach', 'Toadstool', 8, 8);
