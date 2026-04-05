import { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle2, AlertCircle, Loader2, 
  FileText, Calendar, MapPin, Building2,
  ChevronRight, Inbox, PlusCircle
} from 'lucide-react';

const MyGrievancesTab = ({ 
  complaints = [], 
  loading = false, 
  selectedComplaint,
  onSelectComplaint,
  onNavigateToLodge
}) => {
  const [selected, setSelected] = useState(null);

  // Update selected when complaints load or selectedComplaint changes
  useEffect(() => {
    if (selectedComplaint) {
      setSelected(selectedComplaint);
    } else if (complaints.length > 0 && !selected) {
      setSelected(complaints[0]);
    }
  }, [complaints, selectedComplaint, selected]);

  const handleSelect = (complaint) => {
    setSelected(complaint);
    if (onSelectComplaint) onSelectComplaint(complaint);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'OPEN':
        return {
          icon: AlertCircle,
          label: 'Open',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          iconColor: 'text-amber-500'
        };
      case 'IN_PROGRESS':
        return {
          icon: Loader2,
          label: 'In Progress',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-500',
          animate: true
        };
      case 'RESOLVED':
        return {
          icon: CheckCircle2,
          label: 'Resolved',
          bgColor: 'bg-emerald-50',
          textColor: 'text-emerald-700',
          borderColor: 'border-emerald-200',
          iconColor: 'text-emerald-500'
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          bgColor: 'bg-slate-50',
          textColor: 'text-slate-700',
          borderColor: 'border-slate-200',
          iconColor: 'text-slate-500'
        };
    }
  };

  const getTimelineStep = (status) => {
    if (status === 'RESOLVED') return 3;
    if (status === 'IN_PROGRESS') return 2;
    return 1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-500">Loading your grievances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-280px)]">
      
      {/* ==================== LEFT PANEL (35%) - Ticket List ==================== */}
      <div className="w-full lg:w-[35%] border-r border-slate-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Your Grievances
            <span className="ml-auto bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {complaints.length}
            </span>
          </h2>
        </div>

        {complaints.length === 0 ? (
          <div className="p-8 text-center">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-2">No grievances yet</h3>
            <p className="text-sm text-slate-500 mb-4">Your submitted grievances will appear here.</p>
            {onNavigateToLodge && (
              <button
                onClick={onNavigateToLodge}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Lodge Your First Grievance
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {complaints.map((complaint) => {
              const statusConfig = getStatusConfig(complaint.status);
              const StatusIcon = statusConfig.icon;
              const isSelected = selected?.id === complaint.id;

              return (
                <button
                  key={complaint.id}
                  onClick={() => handleSelect(complaint)}
                  className={`
                    w-full text-left p-4 transition-all hover:bg-slate-50
                    ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-400">#{complaint.id}</span>
                        <span className={`
                          inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                          ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}
                        `}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor} ${statusConfig.animate ? 'animate-spin' : ''}`} />
                          {statusConfig.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 text-sm truncate mb-1">
                        {complaint.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {complaint.departmentName || complaint.department?.name || 'Department'}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 flex-shrink-0 mt-1 ${isSelected ? 'text-blue-600' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ==================== RIGHT PANEL (65%) - Detail View ==================== */}
      <div className="hidden lg:flex lg:w-[65%] flex-col bg-white">
        {selected ? (
          <div className="p-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-mono text-slate-400">Ticket #{selected.id}</span>
                {(() => {
                  const statusConfig = getStatusConfig(selected.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium
                      ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}
                    `}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor} ${statusConfig.animate ? 'animate-spin' : ''}`} />
                      {statusConfig.label}
                    </span>
                  );
                })()}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{selected.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {selected.departmentName || selected.department?.name || 'Department'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(selected.createdAt).toLocaleDateString('en-IN', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </span>
                {selected.latitude && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {selected.latitude}, {selected.longitude}
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Vertical Timeline */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">Resolution Progress</h2>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 rounded-full" />
                
                {/* Progress Fill */}
                <div 
                  className="absolute left-4 top-4 w-0.5 bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ height: `${((getTimelineStep(selected.status) - 1) / 2) * 100}%` }}
                />

                {/* Steps */}
                <div className="space-y-6">
                  {/* Step 1: Submitted */}
                  <div className="relative flex items-start gap-4 pl-10">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Submitted</h3>
                      <p className="text-sm text-slate-500">
                        {new Date(selected.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Under Review */}
                  <div className="relative flex items-start gap-4 pl-10">
                    <div className={`
                      absolute left-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all
                      ${getTimelineStep(selected.status) >= 2 
                        ? 'bg-emerald-500' 
                        : 'bg-white border-2 border-slate-200'
                      }
                    `}>
                      {getTimelineStep(selected.status) >= 2 
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <Clock className="w-4 h-4 text-slate-400" />
                      }
                    </div>
                    <div>
                      <h3 className={`font-semibold ${getTimelineStep(selected.status) >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>
                        Under Review
                      </h3>
                      <p className="text-sm text-slate-500">
                        {getTimelineStep(selected.status) >= 2 
                          ? 'Your grievance is being processed by the department'
                          : 'Awaiting review'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Resolved */}
                  <div className="relative flex items-start gap-4 pl-10">
                    <div className={`
                      absolute left-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all
                      ${getTimelineStep(selected.status) >= 3 
                        ? 'bg-emerald-500' 
                        : 'bg-white border-2 border-slate-200'
                      }
                    `}>
                      <CheckCircle2 className={`w-4 h-4 ${getTimelineStep(selected.status) >= 3 ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${getTimelineStep(selected.status) >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>
                        Resolved
                      </h3>
                      <p className="text-sm text-slate-500">
                        {getTimelineStep(selected.status) >= 3 
                          ? selected.resolvedAt 
                            ? new Date(selected.resolvedAt).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric'
                              })
                            : 'Issue has been resolved'
                          : 'Pending resolution'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed">{selected.description}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">Select a Grievance</h3>
              <p className="text-sm text-slate-500">Choose a ticket from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGrievancesTab;
