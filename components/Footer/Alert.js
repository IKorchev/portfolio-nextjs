'use client';

const Alert = ({ type }) => {
  const message = type === 'success' ? 'Your message was sent successfully.' : "There was an error, please make sure you've entered all fields";
  return (
    <div className={`${type === 'success' ? 'bg-green-300' : type === 'fail' ? 'bg-rose-200' : type} bg-white text-center font-semibold  p-3 py-4 mt-10 relative`}>
      <p className={`${type === 'success' ? 'text-green-900' : 'text-rose-900'} text-lg`}>{message}</p>
    </div>
  );
};

export default Alert;
