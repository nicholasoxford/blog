import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { FeatureCollection, Geometry } from 'geojson'
import {
  StateMapProps,
  StateProperties,
  visitedStates,
  drivenThroughStates,
} from '../../../components/state-map/types'
import { colors, fetchStateData } from '../../../components/state-map/utils'

export default function StateMap({
  width: initialWidth = 800,
  height: initialHeight = 500,
}: StateMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  })
  const [usGeoData, setUsGeoData] = useState<FeatureCollection<
    Geometry,
    StateProperties
  > | null>(null)
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    fetchStateData().then(setUsGeoData)
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const aspectRatio = initialHeight / initialWidth
      const newWidth = Math.min(containerWidth - 32, initialWidth)
      const newHeight = newWidth * aspectRatio
      setDimensions({ width: newWidth, height: newHeight })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [initialWidth, initialHeight])

  const getStateColor = (code: string, isHovered = false) => {
    if (visitedStates.includes(code)) {
      return isHovered ? colors.visitedHover : colors.visited
    }
    if (drivenThroughStates.includes(code)) {
      return isHovered ? colors.drivenThroughHover : colors.drivenThrough
    }
    return isHovered ? colors.unvisitedHover : colors.unvisited
  }

  useEffect(() => {
    if (!usGeoData || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    // Create projection and path generator
    const projection = d3
      .geoAlbersUsa()
      .fitSize([dimensions.width, dimensions.height], usGeoData)
    const pathGenerator = d3.geoPath().projection(projection)

    // Create the map
    const g = svg.append('g')

    g.selectAll('path')
      .data(usGeoData.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator as any)
      .attr('class', 'state')
      .attr('fill', (d) => getStateColor(d.properties.code))
      .attr('stroke', colors.stroke)
      .attr('stroke-width', 1)
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).attr(
          'fill',
          getStateColor(d.properties.code, true)
        )

        const rect = (
          event.currentTarget as SVGPathElement
        ).getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top

        setTooltipContent(d.properties.name)
        setTooltipPosition({ x, y })
      })
      .on('mouseout', (event, d) => {
        d3.select(event.currentTarget).attr(
          'fill',
          getStateColor(d.properties.code)
        )
        setTooltipContent('')
      })
  }, [usGeoData, dimensions.width, dimensions.height])

  return (
    <div ref={containerRef} className='relative mx-auto w-full max-w-[800px]'>
      <div className='relative mb-6 px-4'>
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className='mx-auto'
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {tooltipContent && (
          <div
            className='pointer-events-none fixed z-50 -translate-x-1/2 rounded bg-black/90 px-3 py-1.5 text-sm font-medium text-white shadow-lg'
            style={{
              left: tooltipPosition.x,
              top: Math.max(tooltipPosition.y - 35, 0),
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>

      <div className='mx-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
          <div className='flex items-center gap-3'>
            <div
              className='h-5 w-5 shrink-0 rounded shadow-sm'
              style={{ backgroundColor: colors.visited }}
            />
            <span className='text-sm font-medium text-gray-900'>
              States we&apos;ve stayed in
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='h-5 w-5 shrink-0 rounded shadow-sm'
              style={{ backgroundColor: colors.drivenThrough }}
            />
            <span className='text-sm font-medium text-gray-900'>
              Driven through
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='h-5 w-5 shrink-0 rounded shadow-sm'
              style={{ backgroundColor: colors.unvisited }}
            />
            <span className='text-sm font-medium text-gray-900'>
              Not yet visited
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
