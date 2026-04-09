import { Megaphone } from 'lucide-react';

const NoticeBanner = () => {
    return (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 w-full flex items-center justify-center sm:justify-start gap-3">
      <span className="flex h-2 w-2 relative shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
      </span>
            <p className="text-sm text-amber-900 font-medium truncate">
                <strong className="font-bold mr-2">Official Alert:</strong>
                Scheduled smart-LED street light maintenance in Patia area this weekend. Expect temporary outages.
            </p>
        </div>
    );
};

export default NoticeBanner;