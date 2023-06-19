interface NoticeProps {
  message: string,
}

function Notice({ message }: NoticeProps) {
  return (
    <div className="flex justify-center items-center flex-grow p-5">
      <span className="text-notion text-lg font-semibold">{message}</span>
    </div>
  );
}

export default Notice;
