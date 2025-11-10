const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const Training = require('./models/training');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Employee.deleteMany({});
    // await Training.deleteMany({});

    // Seed Employees
    const employees = [
      {
        employeeId: 'EMP001',
        employeeName: 'Veera',
        email: 'veera@company.com',
        department: 'IT',
        designation: '',
        isActive: true
      },
      {
        employeeId: 'EMP002',
        employeeName: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'IT',
        designation: 'Full Stack Developer',
        isActive: true
      },
      {
        employeeId: 'EMP003',
        employeeName: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        department: 'Finance',
        designation: 'Financial Analyst',
        isActive: true
      },
      {
        employeeId: 'EMP004',
        employeeName: 'Sarah Williams',
        email: 'sarah.williams@company.com',
        department: 'IT',
        designation: 'Backend Developer',
        isActive: true
      },
      {
        employeeId: 'EMP005',
        employeeName: 'David Brown',
        email: 'david.brown@company.com',
        department: 'Operations',
        designation: 'Business Analyst',
        isActive: true
      }
    ];

    for (const emp of employees) {
      const exists = await Employee.findOne({ employeeId: emp.employeeId });
      if (!exists) {
        await Employee.create(emp);
        console.log(`Created employee: ${emp.employeeName}`);
      }
    }

    // Seed Trainings
    const trainings = [
      {
        trainingCode: 'MEAN001',
        trainingName: 'Angular Fundamentals',
        stack: 'MEAN',
        duration: 30,
        description: 'Complete Angular framework training'
      },
      {
        trainingCode: 'MEAN002',
        trainingName: 'Node.js & Express',
        stack: 'MEAN',
        duration: 25,
        description: 'Backend development with Node.js and Express'
      },
      {
        trainingCode: 'MEAN003',
        trainingName: 'MongoDB Database',
        stack: 'MEAN',
        duration: 20,
        description: 'NoSQL database management with MongoDB'
      },
      {
        trainingCode: 'MEAN004',
        trainingName: 'Full Stack MEAN',
        stack: 'MEAN',
        duration: 60,
        description: 'Complete MEAN stack development'
      },
      {
        trainingCode: 'SAP001',
        trainingName: 'SAP ABAP',
        stack: 'SAP',
        duration: 45,
        description: 'Advanced Business Application Programming'
      },
      {
        trainingCode: 'SAP002',
        trainingName: 'SAP FICO',
        stack: 'SAP',
        duration: 40,
        description: 'Financial Accounting and Controlling'
      },
      {
        trainingCode: 'SAP003',
        trainingName: 'SAP MM',
        stack: 'SAP',
        duration: 35,
        description: 'Materials Management'
      },
      {
        trainingCode: 'CBP001',
        trainingName: 'Core Banking Platform',
        stack: 'CBP',
        duration: 50,
        description: 'Banking software systems and operations'
      },
      {
        trainingCode: 'CBP002',
        trainingName: 'Payment Systems',
        stack: 'CBP',
        duration: 30,
        description: 'Digital payment processing and integration'
      },
      {
        trainingCode: 'FUNC001',
        trainingName: 'Business Analysis',
        stack: 'Functional',
        duration: 30,
        description: 'Requirements gathering and analysis'
      },
      {
        trainingCode: 'FUNC002',
        trainingName: 'Project Management',
        stack: 'Functional',
        duration: 25,
        description: 'Agile and traditional project management'
      },
      {
        trainingCode: 'FUNC003',
        trainingName: 'Quality Assurance',
        stack: 'Functional',
        duration: 20,
        description: 'Testing methodologies and best practices'
      }
    ];

    for (const training of trainings) {
      const exists = await Training.findOne({ trainingCode: training.trainingCode });
      if (!exists) {
        await Training.create(training);
        console.log(`Created training: ${training.trainingName}`);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();