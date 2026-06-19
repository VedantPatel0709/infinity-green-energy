'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Search, HelpCircle, Filter, Plus, Download, ChevronRight } from 'lucide-react';

export default function AdminEmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  return (
    <div className="bg-light min-h-screen text-dark font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-semibold">Employees</span>
        </div>

        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-slate-200/80">
          <div className="space-y-2 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
              <Users className="w-3.5 h-3.5" /> Admin Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-black font-heading text-dark uppercase tracking-tight">
              Employees Management
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-sans">
              Internal organizational directory and access control matrix for the Infinity Green advisory and grid liaison teams.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              disabled 
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 font-bold text-xs uppercase tracking-wider bg-white cursor-not-allowed flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export List
            </button>
            <button 
              disabled 
              className="px-4 py-2.5 rounded-xl bg-primary/20 text-primary/50 font-bold text-xs uppercase tracking-wider cursor-not-allowed flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Employee
            </button>
          </div>
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
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs focus:outline-none text-slate-600 font-bold pr-4 py-1"
                >
                  <option value="all">All Roles</option>
                  <option value="Founder">Founder</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Business Development Executive">Business Development Executive</option>
                  <option value="Energy Analyst">Energy Analyst</option>
                </select>
              </div>

              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto sm:ml-4">
                Records: 0
              </span>
            </div>
          </div>

          {/* Table Headers */}
          <div className="min-w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs font-sans">
              <thead className="bg-slate-50 font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joining Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="max-w-md mx-auto space-y-4 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Users className="w-6 h-6 text-slate-300" />
                      </div>
                      <div className="space-y-1 px-4">
                        <h4 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                          No employee records available yet.
                        </h4>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                          Employee data will appear after backend integration.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-lg">
                        <HelpCircle className="w-3 h-3" /> System Locked
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-slate-400" /> System is fully prepared to sync database collections.
          </div>

        </div>

      </div>
    </div>
  );
}
