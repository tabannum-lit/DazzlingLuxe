import { useState } from 'react';

const tabs = ['Details', 'Shipping', 'Returns'] as const;

type DescriptionTabsProps = {
  description: string;
  details: string[];
};

const DescriptionTabs = ({ description, details }: DescriptionTabsProps) => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Details');

  return (
    <section className="mt-12 rounded-2xl border border-pink-100 bg-white p-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeTab === tab ? 'bg-pink-500 text-white' : 'bg-pink-50 text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-5 text-sm leading-7 text-gray-600">
        {activeTab === 'Details' ? (
          <div>
            <p>{description}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {activeTab === 'Shipping' ? <p>Standard shipping 3-5 business days within Canada. Express options at checkout (mock).</p> : null}
        {activeTab === 'Returns' ? <p>30-day returns accepted on unworn items in original packaging. Personalized pieces are final sale (mock).</p> : null}
      </div>
    </section>
  );
};

export default DescriptionTabs;
