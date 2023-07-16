import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import DriverHeader from './DriverHeader';

const sampleTransactions = [
  {
    id: 1,
    amount: 250,
    description: 'Completed Ride',
    date: '2023-07-10',
  },
  {
    id: 2,
    amount: -50,
    description: 'Service Fee Deduction',
    date: '2023-07-15',
  },
  {
    id: 3,
    amount: 100,
    description: 'Completed Ride',
    date: '2023-07-20',
  },
];
const wallets = [
  {
    id: 1,
    name: 'My Wallet',
    balance: 350,
  },
  {
    id: 2,
    name: 'Bonus Wallet',
    balance: 100,
  },
];

const DriverEarnings = () => {

  const totalEarnings = sampleTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <DriverHeader />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-gray-900 p-10 rounded-lg"
      >
        <div className="flex items-center mb-4">
          <FaMoneyBillAlt className="mr-2 text-green-500" size={24} />
          <h2 className="text-lg font-semibold text-green-500">Earnings</h2>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">Total Earnings:</h3>
          <p className="text-2xl font-bold text-green-500">${totalEarnings}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Transactions:</h3>
          <ul className="mt-4">
            {sampleTransactions.map((transaction) => (
              <motion.li
                key={transaction.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between mb-2"
              >
                <div>
                  <p className="text-white">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <p
                  className={`text-lg font-bold ${
                    transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount)}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white">Wallet Integration Options:</h3>
          <ul className="mt-4">
            {wallets.map((wallet) => (
              <li
                key={wallet.id}
                className="flex items-center justify-between mb-2"
              >
                <div>
                  <p className="text-white">{wallet.name}</p>
                  <p className="text-xs text-gray-500">Balance: ${wallet.balance}</p>
                </div>
                <button
                  className="bg-blue-500 px-4 py-2 text-white rounded-md"
                  // onClick={() => handleWalletTransaction(wallet.id)}
                >
                  Send Money
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default DriverEarnings;
