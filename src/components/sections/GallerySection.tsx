import { motion } from 'framer-motion'
import { skillCards } from '@/data/skills'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function GallerySection() {
  return (
    <section id="habilidades" className="py-20 bg-bg">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-montserrat font-bold text-center mb-12 text-primary"
        >
          Habilidades
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCards.map((skillCard, index) => (
            <motion.div
              key={skillCard.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="skill" className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${skillCard.accentColor}20` }}
                    >
                      {skillCard.icon}
                    </div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: skillCard.accentColor }}
                    >
                      {skillCard.title}
                    </h3>
                  </div>

                  {skillCard.items.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        {item.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}