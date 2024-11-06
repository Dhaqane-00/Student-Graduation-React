# Student Graduation Analysis Dashboard 🎓

A modern web application built with React, TypeScript, and Material-UI that helps analyze and predict student graduation outcomes.

## 🌟 Features

- **Dashboard Analytics**: Visualize student data through interactive charts
- **Department-wise Analysis**: Track student performance across different departments
- **Prediction System**: Predict graduation outcomes based on various parameters
- **File Upload**: Support for data import through file uploads
- **User Authentication**: Secure login system with profile management
- **Responsive Design**: Fully responsive layout that works on all devices

## 🚀 Tech Stack

- **Frontend Framework**: React 18.x
- **Language**: TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Charts**: ECharts
- **Routing**: React Router v6
- **Build Tool**: Vite
- **API Integration**: RTK Query
- **File Processing**: XLSX

## 📦 Installation

1. Clone the repository:
```bash
https://github.com/Dhaqane-00/Student-Graduation-React.git
cd student-graduation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm start` - Serve production build

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── layouts/         # Layout components
├── pages/          # Page components
├── store/          # Redux store configuration
├── theme/          # MUI theme customization
├── providers/      # Context providers
├── routes/         # Route configurations
└── helpers/        # Utility functions
```

## 📊 Data Format

The system expects student data in the following format:

- **Department**: Student's department
- **Sex**: Gender
- **Mode**: Study mode (full-time/part-time)
- **Att-S1 to Att-S8**: Attendance percentages per semester
- **Scholarship**: Scholarship amount
- **GPA S1 to S8**: GPA for each semester
- **No-Re-exam**: Number of re-examination subjects

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Abdilaahi MOwliid - *Initial work* - [YourGithub](https://github.com/Dhaqane-00)

## 🙏 Acknowledgments

- Material-UI team for the amazing component library
- ECharts for the powerful charting capabilities
- The React community for continuous support and inspiration


This README provides a comprehensive overview of your project, making it easy for other developers to understand and contribute to your codebase. It includes all the essential sections:
Project description and features
Technology stack
Installation instructions
Available scripts
Project structure
Data format requirements
Environment setup
Contribution guidelines
License information
Author credits
The formatting uses emojis and clear headings to improve readability and visual appeal. You can customize the content further based on your specific project needs and requirements.