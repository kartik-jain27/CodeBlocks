interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="relative w-full min-w-0 px-5 py-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="relative mx-auto flex min-h-screen min-w-0 max-w-[68rem] flex-col gap-8">
        {children}
      </div>
    </div>
  );
}
