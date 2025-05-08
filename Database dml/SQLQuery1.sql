USE [QuizDB]
INSERT INTO dbo.Questions (QuestionInWords, ImageName, Option1, Option2, Option3, Option4, Answer)  
VALUES  
('What is the capital of France?', NULL, 'Berlin', 'Madrid', 'Paris', 'Rome', 3),  
('Which planet is known as the Red Planet?', NULL, 'Earth', 'Mars', 'Jupiter', 'Venus', 2),  
('Who wrote "Hamlet"?', NULL, 'Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Leo Tolstoy', 2),  
('What is the largest ocean on Earth?', NULL, 'Atlantic', 'Indian', 'Arctic', 'Pacific', 4),  
('Which element has the chemical symbol "O"?', NULL, 'Oxygen', 'Gold', 'Silver', 'Iron', 1),  
('How many continents are there?', NULL, '5', '6', '7', '8', 3),  
('What is the square root of 64?', NULL, '6', '7', '8', '9', 3),  
('Which country is famous for sushi?', NULL, 'China', 'Japan', 'Korea', 'Thailand', 2),  
('Who painted the Mona Lisa?', NULL, 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet', 2),  
('What is the boiling point of water in Celsius?', NULL, '90°C', '100°C', '110°C', '120°C', 2);  

SELECT * FROM Question;
