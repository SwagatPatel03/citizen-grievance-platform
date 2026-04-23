/**
 * Shared TabBar component for Officer & Admin portals.
 * Sticks below the navbar (top-16) with consistent styling.
 *
 * Props:
 *   tabs      - Array of { id, label, icon: LucideIcon }
 *   activeTab - currently active tab id
 *   onTabChange - callback(tabId)
 */
const TabBar = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex gap-1 -mb-px overflow-x-auto" aria-label="Portal tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                                    flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap
                                    ${isActive
                                        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }
                                `}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default TabBar;
