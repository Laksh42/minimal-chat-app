import React from 'react';\nimport { useChat } from '../context/ChatContext';\nimport { Group } from '../types';\n\ninterface SidebarProps {\n  isOpen: boolean;\n  onClose: () => void;\n  isMobile: boolean;\n}\n\nconst Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {\n  const { groups, selectedGroup, selectGroup } = useChat();\n\n  const handleGroupSelect = (group: Group) => {\n    selectGroup(group.id);\n    if (isMobile) {\n      onClose();\n    }\n  };\n\n  if (!isOpen) return null;\n\n  return (\n    <div className={`\n      ${isMobile ? 'absolute z-10 h-[calc(100%-3.5rem)] top-14 w-full' : 'w-80'}\n      border-r border-[var(--color-border)] bg-[var(--color-bg-sidebar)]\n    `}>\n      <div className=\"flex justify-between items-center p-4 border-b border-[var(--color-border)]\">\n        <h2 className=\"text-lg font-bold text-[var(--color-text-primary)]\">Chats</h2>\n        {isMobile && (\n          <button \n            onClick={onClose}\n            className=\"p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] rounded-md transition-colors\"\n          >\n            <svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M6 18L18 6M6 6l12 12\" />\n            </svg>\n          </button>\n        )}\n      </div>\n\n      <div className=\"p-2\">\n        <div className=\"relative mb-4\">\n          <input\n            type=\"text\"\n            placeholder=\"Search conversations...\"\n            className=\"w-full p-2 pl-8 rounded-md bg-[var(--color-input-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]\"\n          />\n          <div className=\"absolute left-2 top-2.5 text-[var(--color-text-secondary)]\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\" />\n            </svg>\n          </div>\n        </div>\n\n        <div className=\"space-y-1\">\n          {groups.map((group) => (\n            <div\n              key={group.id}\n              className={`\n                p-3 rounded-md cursor-pointer flex items-center space-x-3\n                ${selectedGroup?.id === group.id ? 'bg-[var(--color-selected)]' : 'hover:bg-[var(--color-hover)]'}\n              `}\n              onClick={() => handleGroupSelect(group)}\n            >\n              <div className=\"relative\">\n                <div className=\"w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-medium\">\n                  {group.name.charAt(0)}\n                </div>\n                {group.unreadCount > 0 && (\n                  <div className=\"absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center\">\n                    {group.unreadCount}\n                  </div>\n                )}\n              </div>\n              <div className=\"flex-1 min-w-0\">\n                <h3 className=\"text-[var(--color-text-primary)] font-medium truncate\">{group.name}</h3>\n                <p className=\"text-[var(--color-text-secondary)] text-sm truncate\">\n                  {group.lastMessage}\n                </p>\n              </div>\n              <div className=\"text-xs text-[var(--color-text-secondary)]\">\n                {group.lastMessageTime}\n              </div>\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default Sidebar;