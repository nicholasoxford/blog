import { Feature, FeatureCollection, Geometry } from 'geojson'
import * as topojson from 'topojson-client'
import { StateProperties, stateCodeMap } from './types'

export async function fetchStateData(): Promise<
  FeatureCollection<Geometry, StateProperties>
> {
  const response = await fetch(
    'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'
  )
  const topology = await response.json()

  const baseStates = topojson.feature(
    topology,
    topology.objects.states
  ) as unknown as FeatureCollection<Geometry, any>

  return {
    type: 'FeatureCollection',
    features: baseStates.features.map(
      (feature: Feature<Geometry, any>): Feature<Geometry, StateProperties> => {
        const stateProps: StateProperties = {
          name: feature.properties?.name || 'Unknown',
          code: stateCodeMap[feature.id as string] || '',
        }
        return {
          type: 'Feature',
          geometry: feature.geometry,
          properties: stateProps,
        }
      }
    ),
  }
}

export const colors = {
  visited: '#34D399',
  visitedHover: '#10B981',
  drivenThrough: '#60A5FA',
  drivenThroughHover: '#3B82F6',
  unvisited: '#e5e7eb',
  unvisitedHover: '#d1d5db',
  stroke: '#fff',
}
