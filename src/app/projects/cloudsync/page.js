'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const stats = [
  { label: 'Total Revenue', value: '$48,250', change: '+12.5%', isUp: true, changeLabel: 'from last month' },
  { label: 'Active Users', value: '2,847', change: '+8.3%', isUp: true, changeLabel: 'from last week' },
  { label: 'Projects', value: '24', change: '+3 new', isUp: true, changeLabel: 'this month' },
  { label: 'System Uptime', value: '99.98%', change: '-0.02%', isUp: false, changeLabel: 'from target' }
];

const initialTasks = [
  { id: 1, name: 'Redesign landing page Hero section', meta: 'Design system updates', priority: 'High', done: true },
  { id: 2, name: 'Integrate Stripe payment gateways', meta: 'Payment service API', priority: 'High', done: false },
  { id: 3, name: 'User test checkout dashboard', meta: 'UX research sprints', priority: 'Medium', done: false },
  { id: 4, name: 'Write API endpoint documentation', meta: 'Backend wiki guides', priority: 'Low', done: false },
  { id: 5, name: 'Fix floating bugs in mobile sidebar layout', meta: 'UI/UX minor bugs', priority: 'Medium', done: true }
];

const activities = [
  { dotColor: '#3b82f6', text: 'Sarah Mitchell pushed 3 commits to main branch', time: '2 mins ago' },
  { dotColor: '#10b981', text: 'Deployment completed successfully on production', time: '15 mins ago' },
  { dotColor: '#f59e0b', text: 'New user signup spikes detected: +45 users/hr', time: '1 hour ago' },
  { dotColor: '#8b5cf6', text: 'Database automated backup completed', time: '3 hours ago' }
];

const team = [
  { name: 'Alex Kim', role: 'Lead Developer', initials: 'AK', bg: 'linear-gradient(135deg, #2563eb, #06b6d4)' },
  { name: 'Sarah Miller', role: 'UI/UX Designer', initials: 'SM', bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  { name: 'James Davis', role: 'Backend Engineer', initials: 'JD', bg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { name: 'Lisa Park', role: 'Project Manager', initials: 'LP', bg: 'linear-gradient(135deg, #10b981, #06b6d4)' }
];

const sidebarTabs = [
  {
    name: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
        <rect x="3" y="3" width="7" height="9"></rect>
        <rect x="14" y="3" width="7" height="5"></rect>
        <rect x="14" y="12" width="7" height="9"></rect>
        <rect x="3" y="16" width="7" height="5"></rect>
      </svg>
    )
  },
  {
    name: 'Analytics',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    )
  },
  {
    name: 'Tasks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
      </svg>
    )
  },
  {
    name: 'Team',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    name: 'Settings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  }
];

export default function CloudSync() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifs, setShowNotifs] = useState(false);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backBtn}>
        ← Back to Portfolio
      </Link>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>CloudSync</div>
        <nav className={styles.sidebarNav}>
          {sidebarTabs.map((tab) => (
            <button
              key={tab.name}
              className={`${styles.sidebarLink} ${activeTab === tab.name ? styles.sidebarLinkActive : ''}`}
              onClick={() => setActiveTab(tab.name)}
            >
              <span className={styles.sidebarIcon}>{tab.icon}</span> {tab.name}
            </button>
          ))}
        </nav>
        <div style={{ color: '#475569', fontSize: '0.8rem', marginTop: 'auto' }}>
          Version 2.4.1
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.greeting}>Good Evening, Kavyansh</h1>
            <p className={styles.greetingSub}>
              {activeTab === 'Dashboard' && "Here's a quick summary of what's happening today."}
              {activeTab === 'Analytics' && "Real-time user engagement and performance analytics."}
              {activeTab === 'Tasks' && "Manage your sprint backlogs and team task assignments."}
              {activeTab === 'Team' && "Collaborate with your active workspace members."}
              {activeTab === 'Settings' && "Manage your API keys, integrations, and preferences."}
            </p>
          </div>
          <div className={styles.topActions} style={{ position: 'relative' }}>
            <input type="text" placeholder="Search anything..." className={styles.searchBox} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div style={{ position: 'relative' }}>
              <button className={styles.notifBtn} onClick={() => setShowNotifs(!showNotifs)}>🔔</button>
              {showNotifs && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifHeader}>Notifications</div>
                  <div className={styles.notifItem}>🟡 Weekly report is ready</div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue + ' ' + (i === 0 ? styles.statGradient : '')}>
                {stat.value}
              </div>
              <div className={styles.statChange}>
                <span className={stat.isUp ? styles.statUp : styles.statDown}>
                  {stat.change} {stat.isUp ? '↑' : '↓'}
                </span>
                <span style={{ color: '#64748b' }}>{stat.changeLabel}</span>
              </div>
            </div>
          ))}
        </section>

        <div className={styles.contentGrid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <span>Revenue Overview</span>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Weekly view</span>
            </div>
            <div className={styles.chartArea}>
              {[60, 85, 45, 70, 90, 55, 75].map((height, i) => (
                <div
                  key={i}
                  className={styles.chartBar}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className={styles.chartLabels}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={i} className={styles.chartLabel}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Active Tasks</div>
            <div className={styles.taskList}>
              {tasks.map((task) => (
                <div key={task.id} className={styles.taskItem}>
                  <div
                    className={styles.taskCheck + ' ' + (task.done ? styles.taskCheckDone : '')}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.done && '✓'}
                  </div>
                  <div className={styles.taskText}>
                    <div className={styles.taskName + ' ' + (task.done ? styles.taskNameDone : '')}>
                      {task.name}
                    </div>
                    <div className={styles.taskMeta}>{task.meta}</div>
                  </div>
                  <span
                    className={
                      styles.taskPriority +
                      ' ' +
                      (task.priority === 'High'
                        ? styles.priorityHigh
                        : task.priority === 'Medium'
                        ? styles.priorityMedium
                        : styles.priorityLow)
                    }
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomGrid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Recent Activity</div>
            <div className={styles.activityList}>
              {activities.map((activity, i) => (
                <div key={i} className={styles.activityItem}>
                  <span
                    className={styles.activityDot}
                    style={{ background: activity.dotColor }}
                  />
                  <div>
                    <p className={styles.activityText}>{activity.text}</p>
                    <p className={styles.activityTime}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Team Members</div>
            <div className={styles.teamGrid}>
              {team.map((member, i) => (
                <div key={i} className={styles.teamMember}>
                  <div
                    className={styles.teamAvatar}
                    style={{ background: member.bg }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h4 className={styles.teamName}>{member.name}</h4>
                    <p className={styles.teamRole}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
