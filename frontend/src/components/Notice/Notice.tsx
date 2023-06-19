interface NoticeProps {
  message: string,
}

function Notice({ message }: NoticeProps) {
  return (
    <div className="flex justify-center items-center flex-grow">
      <span className="text-notion text-lg font-semibold">{message}</span>
    </div>
  );
}

export default Notice;
