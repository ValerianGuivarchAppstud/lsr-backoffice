import React from 'react'
import { ReferenceManyField, TopToolbar, EditButton, CreateButton, ExportButton, RefreshButton } from 'react-admin'

export const ReferenceManyFieldNoLabel = (props) => <ReferenceManyField {...props} />

ReferenceManyFieldNoLabel.defaultProps = {
  addLabel: false
}

export const ShowActionsEdit: any = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
)

export const ListActionsCreateExport: any = ({
  bulkActions,
  basePath,
  currentSort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter,
  total,
  createButton
}) => (
  <TopToolbar>
    {bulkActions &&
      React.cloneElement(bulkActions, {
        basePath,
        filterValues,
        resource,
        selectedIds,
        onUnselectItems
      })}
    {filters &&
      React.cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button'
      })}
    {createButton !== undefined ? createButton : <CreateButton basePath={basePath} />}
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filterValues={filterValues}
      exporter={exporter}
    />
    <RefreshButton />
  </TopToolbar>
)
