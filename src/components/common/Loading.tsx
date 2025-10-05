export const Loading = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center">
      <div className="relative">
        <div className="border-primary/20 h-12 w-12 rounded-full border-4"></div>
        <div className="border-primary absolute top-0 left-0 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    </div>
  );
};
