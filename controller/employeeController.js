const Employee = require('../models/Employee');

const generateEmployeeId = async () => {
  const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
  if (!lastEmployee) return 'EMP001';
  
  const lastId = parseInt(lastEmployee.employeeId.replace('EMP', ''));
  return `EMP${String(lastId + 1).padStart(3, '0')}`;
};

exports.createEmployee = async (req, res) => {
  try {
    const employeeId = await generateEmployeeId();
    const employee = new Employee({ ...req.body, employeeId });
    const savedEmployee = await employee.save();
    
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: savedEmployee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating employee',
      error: error.message
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ isActive: true }).sort({ employeeName: 1 });
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error.message
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      { isActive: false },
      { new: true }
    );
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Employee deactivated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
};