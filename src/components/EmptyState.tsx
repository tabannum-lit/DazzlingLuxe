import { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <section className="rounded-2xl border border-pink-100 bg-white p-10 text-center shadow-sm">
      <h3 className="font-heading text-3xl text-gray-800">{title}</h3>
      <p className="mt-3 text-gray-600">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
};

export default EmptyState;
