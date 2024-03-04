interface FormIdLayoutProps {
  children: React.ReactNode;
}

const FormIdLayout = ({
  children,
}: FormIdLayoutProps) => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      {children}
    </main>
  )
}

export default FormIdLayout