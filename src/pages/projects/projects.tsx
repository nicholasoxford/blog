import Link from 'next/link'

interface Project {
  title: string
  description: string
  slug: string
  tags?: string[]
  image?: string
}

const projects: Project[] = [
  {
    title: 'State Map',
    description: 'Interactive map visualization project',
    slug: 'state-map',
    tags: ['React', 'D3.js', 'GeoJSON'],
  },
  // Add more projects here
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className='block'>
      <div className='rounded-lg border border-gray-200 bg-white/50 p-6 transition-colors hover:border-gray-300 hover:bg-white/80'>
        {project.image && (
          <div className='mb-4 aspect-video overflow-hidden rounded-md bg-gray-100'>
            <img
              src={project.image}
              alt={project.title}
              className='h-full w-full object-cover'
            />
          </div>
        )}
        <h3 className='mb-2 text-xl font-semibold'>{project.title}</h3>
        <p className='mb-4 text-gray-600'>{project.description}</p>
        {project.tags && (
          <div className='flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-700'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function Projects() {
  return (
    <div className='py-8'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
