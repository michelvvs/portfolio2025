import { ArrowDownToDot } from 'lucide-react'
import Session from './Session'
import MenuBar from './MenuBar'
import personalData from '../content/personalData.json'
import experience from '../content/experience.json'
import skills from '../content/skills.json'
import projects from '../content/projects.json'

import Noise from 'blocks/Animations/Noise/Noise'
import SessionHeading from './SessionHeading'
import ProgressBar from './ProgressBar'

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <MenuBar />
      <div className="flex h-[95vh] flex-col place-content-between bg-emerald-500 sm:pt-24 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="flex justify-between gap-8">
            <div className="content-center text-left">
              <h1 className="font-poppins text-8xl uppercase text-white">
                Michel Victor
              </h1>
              <h3 className="font-poppins text-3xl text-white">
                Javascript / Typescript. React | Next | Node | Nest
              </h3>
              <h5 className="mt-8 font-poppins text-xl text-white">
                Rio de Janeiro, Brasil
              </h5>
            </div>
            <div>
              <img src="public/gpt-mario1.png" alt="" className="size-96" />
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <ArrowDownToDot className="mb-8 animate-bounce text-white" />
        </div>
      </div>
      <Session className="flex bg-white" textColor="black">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
          canvasSize={95}
        />

        <SessionHeading subtitle="saiba mais" title="Sobre mim" />
        <div className="flex">
          <div className="w-3/5">
            <h5 className="mb-8 text-4xl font-bold uppercase">
              Sou o Michel Victor!
            </h5>
            <p className="text-lg">
              Desenvolvedor do Rio de Janeiro com foco em front-end e paixão por
              UI/UX. Tenho experiência sólida em JavaScript, trabalhando com
              tecnologias como ReactJS, NextJS, TypeScript, NodeJS e NestJS. Meu
              background em fotografia, audiovisual e design complementa minha
              atuação técnica, trazendo um olhar criativo e centrado na
              experiência do usuário.
            </p>
          </div>
          <div className="w-2/5">
            <div>
              <img
                src="public/michel_boneco.png"
                alt=""
                className="h-auto w-72"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          {personalData.map((dado, i) => {
            return (
              <div key={i}>
                <h3 className="text-xl uppercase">{dado.dado}</h3>
                <h3 className="text-2xl font-bold uppercase">{dado.descr}</h3>
              </div>
            )
          })}
        </div>
      </Session>
      <Session className="bg-gray-200" textColor="black">
        <SessionHeading subtitle="minha" title="Experiência profissional" />
        <div className="flex">
          <div className="flex h-screen w-1/2 flex-col flex-wrap">
            {experience.map((experience, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 border-l-4 border-green-600 pb-12 pl-4"
                >
                  <h3 className="text-3xl font-bold">{experience.cargo}</h3>
                  <h5 className="text-xl">
                    {experience.empresa}{' '}
                    <span className="text-slate-500">
                      {experience.inicio} - {experience.fim}
                    </span>
                  </h5>
                  <p className="text-2xl">{experience.descr}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Session>
      <Session className="bg-emerald-900" textColor="black">
        <SessionHeading
          subtitle="minhas"
          title="Skills"
          colorSubTitle="text-white"
          colorTitle="text-white"
        />
        <div className="flex">
          <div className="flex flex-wrap">
            {skills.map((skill, i) => {
              return (
                <div key={i} className="flex w-1/2 flex-col gap-4 pb-12 pl-4">
                  <div className="flex  justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {skill.tech}
                    </h3>
                    <h3 className="text-2xl font-bold text-white">
                      {skill.percentage}%
                    </h3>
                  </div>
                  <ProgressBar percentage={skill.percentage} />
                </div>
              )
            })}
          </div>
        </div>
      </Session>
      <Session className="flex bg-white" textColor="black">
        <SessionHeading subtitle="meus" title="Projetos pessoais" />
        <div className="grid w-full grid-cols-3 justify-items-stretch gap-4">
          {projects.map((project, i) => {
            return (
              <div key={i} className="flex gap-4 bg-gray-400 p-8">
                <div className="flex-row">
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                  <h5>{project.stack}</h5>
                  <p>{project.descr}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Session>
    </div>
  )
}

export default App
