'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Search, HelpCircle, Filter } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: 'Management' | 'Operations' | 'Sales' | 'Analytics';
  designation: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  email: string;
}

export default function AdminEmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [employees] = useState<Employee[]>([
    {
      id: 'EMP-001',
      name: 'Aditya Sen',
      department: 'Management',
      designation: 'Founder & CEO',
      joiningDate: '2024-01-15',
      status: 'Active',
      email: 'aditya.sen@infinitygreen.demo'
    },
    {
      id: 'EMP-002',
      name: 'Rajesh Kulkarni',
      department: 'Operations',
      designation: 'Operations Manager',
      joiningDate: '2024-06-01',
      status: 'Active',
      email: 'rajesh.k@infinitygreen.demo'
    },
    {
      id: 'EMP-003',
      name: 'Priya Sharma',
      department: 'Sales',
      designation: 'Business Development Executive',
      joiningDate: '2025-02-10',
      status: 'Active',
      email: 'priya.s@infinitygreen.demo'
    },
    {
      id: 'EMP-004',
      name: 'Vikram Malhotra',
      department: 'Analytics',
      designation: 'Energy Analyst',
      joiningDate: '2025-08-01',
      status: 'Active',
      email: 'vikram.m@infinitygreen.demo'
    }
  ]);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = deptFilter === 'all' || emp.department === deptFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" /> Admin Panel
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">
            Employee Directory
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans">
            Internal organizational directory and access control matrix for the Infinity Green advisory and grid liaison teams.
          </p>
        </div>

        {/* Employee Table Box */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Controls */}
          <div className="border-b border-slate-100 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search staff registry..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-dark"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <select 
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs focus:outline-none text-slate-600 font-bold pr-4 py-1"
                >
                  <option value="all">All Departments</option>
                  <option value="Management">Management</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Analytics">Analytics</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 text-slate-500">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs focus:outline-none text-slate-600 font-bold pr-4 py-1"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto sm:ml-4">
                Records: {filteredEmployees.length}
              </span>
            </div>
          </div>

          {/* Table Headers */}
          <div className="min-w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs font-sans">
              <thead className="bg-slate-50 font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Joining Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono font-bold text-slate-400">{emp.id}</td>
                      <td className="px-6 py-4">
                        <span className="block font-bold text-dark">{emp.name}</span>
                        <span className="text-[10px] text-slate-400">{emp.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{emp.designation}</td>
                      <td className="px-6 py-4 font-mono text-slate-500">{emp.joiningDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          emp.status === 'On Leave' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                          'bg-red-50 text-red-600 border border-red-200'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="max-w-md mx-auto space-y-4 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Users className="w-6 h-6 text-slate-300" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                            No Employees Match Filters
                          </h4>
                          <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                            Try adjusting your search query or directory filter options.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-slate-400" /> Note: Displaying demo records. Internal database integration pending.
          </div>

        </div>

      </div>
    </div>
  );
}
