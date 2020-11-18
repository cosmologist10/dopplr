import React, { useState } from 'react'
import { Empty, Tabs } from 'antd'
import useMeasure from 'react-use-measure'
import { ResizableBox } from 'react-resizable'
import QueryTab from './components/query-tab'
import HistoryTab from './components/history-tab'
import { ClockCircleOutlined, SaveOutlined } from '@ant-design/icons'

export default function Queries() {
  const [measureContainer, containerBounds] = useMeasure()
  const [sidebarWidth, setSidebarWidth] = useState(288)

  return (
    <div className="flex flex-1 h-full" ref={measureContainer}>
      <ResizableBox
        width={sidebarWidth}
        height={containerBounds.height}
        onResize={(event, { size: { width } }) => {
          setSidebarWidth(width)
        }}
        className="relative flex flex-col flex-shrink-0 h-full overflow-y-auto"
        axis="x"
        resizeHandles={['e']}
        minConstraints={[200, containerBounds.height]}
        maxConstraints={[360, containerBounds.height]}
        handle={() => (
          <div className="absolute top-0 right-0 w-px h-full bg-gray-200 col-resize-handle" />
        )}
      >
        <Tabs
          className="flex-1 mt-1 queries-tab"
          size="small"
          centered
          tabBarGutter={16}
        >
          <Tabs.TabPane
            tab={
              <span className="px-4">
                <ClockCircleOutlined />
                <span>History</span>
              </span>
            }
            key="history"
          >
            <HistoryTab />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="saved"
            tab={
              <span className="px-4">
                <SaveOutlined />
                <span>Saved</span>
              </span>
            }
          >
            <div className="flex items-center justify-center h-full">
              <Empty
                description={
                  <span className="text-xs">Run your first query</span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </ResizableBox>

      <div className="flex flex-col flex-1 tabs-container">
        <Tabs
          type="editable-card"
          className="h-full queries-tab"
          tabBarStyle={{ marginBottom: 0 }}
        >
          <Tabs.TabPane
            tab={<span className="text-xs">Untitled Query</span>}
            className="w-full"
          >
            <QueryTab width={containerBounds.width - sidebarWidth} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}
