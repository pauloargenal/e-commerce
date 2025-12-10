import { AlertTriangleIcon, CheckIcon, InfoIcon } from 'lucide-react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
}

export default function Snackbar(props: SnackbarProps) {
  const { message, type } = props;

  const icon =
    type === 'success' ? (
      <CheckIcon className="w-6 h-6 text-white mr-3" />
    ) : (
      <AlertTriangleIcon className="w-6 h-6 text-white mr-3" />
    );

  const backgroundColor = type === 'success' ? 'bg-green-100' : 'bg-cienna-100';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 py-3 px-6 flex items-center rounded-lg shadow-[0_20px_48px_-10px_rgba(231,136,84,0.5)] animate-slide-in-right ${backgroundColor}`}
    >
      {icon}
      <p className="text-white">{message}</p>
    </div>
  );
}
