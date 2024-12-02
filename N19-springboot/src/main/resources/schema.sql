use smile;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(10),
    phone VARCHAR(15),
    course VARCHAR(255),
    dob DATE,
    version INT
);

CREATE TABLE chart_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    year VARCHAR(10),
    innovation VARCHAR(255),
    strategy VARCHAR(255),
    focus_area VARCHAR(255),
    investment DOUBLE,
    impact_area VARCHAR(255),
    stakeholders VARCHAR(255),
    key_metrics VARCHAR(255),
    priority_level VARCHAR(50)
);

INSERT INTO chart_data (year, innovation, strategy, focus_area, investment, impact_area, stakeholders, key_metrics, priority_level) VALUES
('2024', 'ChatGPT Vision', 'Expansion', 'Multimodal AI', 500, 'Communication, Assistance', 'OpenAI, Developers', 'User adoption, Accuracy', 'High'),
('2024', 'Gemini 1.5', 'Differentiation', 'General-Purpose LLM', 750, 'Knowledge Work', 'Google DeepMind, Partners', 'Efficiency gains, Revenue', 'High'),
('2024', 'CodeWhisperer', 'Optimization', 'AI-Assisted Coding', 200, 'Software Development', 'Amazon, Developers', 'Code quality, Productivity', 'Medium'),
('2024', 'Stability XL', 'Disruption', 'High-Res Image Gen AI', 300, 'Content Creation', 'Stability AI, Designers', 'Render speed, Quality scores', 'Medium'),
('2024', 'Claude 4', 'Risk Mitigation', 'Conversational AI', 600, 'Safety in AI Assistance', 'Anthropic, Enterprises', 'Ethical compliance, Safety', 'High');
