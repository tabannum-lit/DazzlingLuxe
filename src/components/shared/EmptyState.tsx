import { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="text-center py-20 max-w-md mx-auto">
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-beige/30 flex items-center justify-center text-3xl">
      🌿
    </div>
    <h2 className="font-heading text-3xl text-charcoal">{title}</h2>
    <p className="mt-3 text-softBrown">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
