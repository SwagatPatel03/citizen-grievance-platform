import { useState } from 'react';
import { 
  Megaphone, Vote, User, Phone, Mail, MapPin,
  ThumbsUp, MessageSquare, Calendar, ExternalLink,
  Clock, CheckCircle2, Users, Building2
} from 'lucide-react';

// ==================== MOCK DATA ====================
const mockWardCouncillor = {
  name: 'Smt. Priya Mohanty',
  designation: 'Ward Councillor',
  ward: 'Ward 15 - Patia',
  phone: '+91 98765 43210',
  email: 'councillor.ward15@bmc.gov.in',
  officeHours: 'Mon-Sat, 10 AM - 5 PM',
  avatar: null // Would be a URL in production
};

const mockCommunityFeed = [
  {
    id: 1,
    type: 'broadcast',
    author: 'Municipal Corporation',
    title: 'Water Supply Schedule Update',
    content: 'Starting April 8th, water supply timing in Ward 15 will be 6 AM - 8 AM and 5 PM - 7 PM. Please plan accordingly.',
    timestamp: '2 hours ago',
    category: 'Infrastructure'
  },
  {
    id: 2,
    type: 'poll',
    author: 'Ward Development Committee',
    title: 'Vote: Park Renovation Proposal',
    content: 'We are planning to renovate the community park in Sector 5. Which amenities should be prioritized?',
    timestamp: '1 day ago',
    category: 'Community',
    options: [
      { id: 'a', text: 'Children\'s Play Area', votes: 127 },
      { id: 'b', text: 'Walking Track', votes: 89 },
      { id: 'c', text: 'Open Gym Equipment', votes: 156 },
      { id: 'd', text: 'Seating & Shade', votes: 73 }
    ],
    totalVotes: 445,
    hasVoted: false
  },
  {
    id: 3,
    type: 'broadcast',
    author: 'Traffic Police',
    title: 'Road Closure Notice',
    content: 'Due to ongoing drainage work, the service road near KIIT Square will remain closed from April 10-15. Please use alternate routes.',
    timestamp: '2 days ago',
    category: 'Traffic'
  },
  {
    id: 4,
    type: 'event',
    author: 'Ward Office',
    title: 'Free Health Camp',
    content: 'A free health checkup camp will be organized at the Community Hall, Sector 4 on April 12th from 9 AM to 4 PM. Services include BP check, blood sugar test, and eye examination.',
    timestamp: '3 days ago',
    category: 'Health',
    eventDate: 'April 12, 2024'
  }
];

const MyWardTab = () => {
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (pollId, optionId) => {
    setSelectedPollOption(optionId);
    setHasVoted(true);
    // In production: API call to submit vote
  };

  const getCategoryColor = (category) => {
    const colors = {
      Infrastructure: 'bg-blue-100 text-blue-700',
      Community: 'bg-emerald-100 text-emerald-700',
      Traffic: 'bg-amber-100 text-amber-700',
      Health: 'bg-rose-100 text-rose-700',
      default: 'bg-slate-100 text-slate-700'
    };
    return colors[category] || colors.default;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'broadcast': return Megaphone;
      case 'poll': return Vote;
      case 'event': return Calendar;
      default: return Megaphone;
    }
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12 2xl:px-16 py-8">
      <div className="max-w-[800px] mx-auto">
        
        {/* Ward Councillor Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8 shadow-sm">
          <div className="bg-slate-900 px-6 py-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Your Ward Representative
            </h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12 text-white/90" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {mockWardCouncillor.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {mockWardCouncillor.designation} • {mockWardCouncillor.ward}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a 
                    href={`tel:${mockWardCouncillor.phone}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    {mockWardCouncillor.phone}
                  </a>
                  <a 
                    href={`mailto:${mockWardCouncillor.email}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate">{mockWardCouncillor.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Clock className="w-4 h-4" />
                    </div>
                    {mockWardCouncillor.officeHours}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <MapPin className="w-4 h-4" />
                    </div>
                    Ward Office, Sector 4
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="sm:self-start">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  Schedule Meeting
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Community Feed</h2>
          <span className="text-sm text-slate-500">{mockWardCouncillor.ward}</span>
        </div>

        {/* Feed Items */}
        <div className="space-y-4">
          {mockCommunityFeed.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            
            return (
              <article 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-xl">
                        <TypeIcon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{item.author}</p>
                        <p className="text-xs text-slate-400">{item.timestamp}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{item.content}</p>

                  {/* Poll Options */}
                  {item.type === 'poll' && (
                    <div className="space-y-2 mt-4">
                      {item.options.map((option) => {
                        const percentage = Math.round((option.votes / item.totalVotes) * 100);
                        const isSelected = selectedPollOption === option.id;
                        
                        return (
                          <button
                            key={option.id}
                            onClick={() => !hasVoted && handleVote(item.id, option.id)}
                            disabled={hasVoted}
                            className={`
                              w-full relative overflow-hidden rounded-xl border transition-all text-left
                              ${hasVoted 
                                ? 'cursor-default' 
                                : 'hover:border-blue-300 cursor-pointer'
                              }
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-slate-200 bg-white'
                              }
                            `}
                          >
                            {/* Progress bar (shown after voting) */}
                            {hasVoted && (
                              <div 
                                className={`absolute inset-y-0 left-0 transition-all duration-500 ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}`}
                                style={{ width: `${percentage}%` }}
                              />
                            )}
                            
                            <div className="relative px-4 py-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {hasVoted && isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                )}
                                <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                  {option.text}
                                </span>
                              </div>
                              {hasVoted && (
                                <span className="text-sm font-semibold text-slate-600">
                                  {percentage}%
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                      
                      <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                        <Users className="w-4 h-4" />
                        <span>{item.totalVotes} votes</span>
                      </div>
                    </div>
                  )}

                  {/* Event Date Badge */}
                  {item.type === 'event' && item.eventDate && (
                    <div className="mt-4 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-100">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{item.eventDate}</span>
                      <span className="text-sm">• Mark your calendar</span>
                    </div>
                  )}

                  {/* Engagement Actions */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                    <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Load more updates...
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyWardTab;
