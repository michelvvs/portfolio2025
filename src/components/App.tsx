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
      <div className="flex h-[95vh] flex-col justify-between bg-emerald-500 pt-24 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h1 className="font-poppins text-5xl uppercase text-white sm:text-6xl lg:text-8xl">
                Michel Victor
              </h1>
              <h3 className="font-poppins text-xl text-white sm:text-2xl lg:text-3xl">
                Javascript / Typescript. React | Next | Node | Nest
              </h3>
              <h5 className="mt-4 font-poppins text-base text-white sm:mt-8 sm:text-xl">
                Rio de Janeiro, Brasil
              </h5>
            </div>
            <div>
              <img
                src="/gpt-mario1.png"
                alt=""
                className="w-48 sm:w-72 lg:w-96"
              />
            </div>
          </div>
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
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-3/5">
            <h5 className="mb-4 text-3xl font-bold uppercase sm:text-4xl">
              Sou o Michel Victor!
            </h5>
            <p className="text-base sm:text-lg">
              Sou Michel Victor, desenvolvedor do Rio de Janeiro apaixonado por
              tecnologia, design e tudo que envolve código. Tenho experiência
              sólida com JavaScript e seu ecossistema — incluindo Node.js,
              TypeScript, React, Next.js e NestJS — sempre buscando unir
              performance, boas práticas e um olhar atento à experiência do
              usuário. Além da programação, trago uma bagagem criativa nas áreas
              de fotografia, audiovisual e design, o que me ajuda a entregar
              soluções completas, funcionais e visualmente atrativas.
            </p>
          </div>
          <div className="mx-auto lg:w-2/5">
            <img
              src="/michel_boneco.png"
              alt=""
              className="h-auto w-48 sm:w-64 lg:w-72"
            />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalData.map((dado, i) => (
            <div key={i}>
              <h3 className="text-base uppercase sm:text-xl">{dado.dado}</h3>
              <h3 className="text-lg font-bold uppercase sm:text-2xl">
                {dado.descr}
              </h3>
            </div>
          ))}
        </div>
      </Session>
      <Session className="bg-gray-200" textColor="black">
        <SessionHeading subtitle="minha" title="Experiência profissional" />
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {experience.map((experience, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 border-l-4 border-green-600 pl-4"
              >
                <h3 className="text-xl font-bold sm:text-2xl">
                  {experience.cargo}
                </h3>
                <h5 className="text-base sm:text-lg">
                  {experience.empresa}{' '}
                  <span className="text-slate-500">
                    {experience.inicio} - {experience.fim}
                  </span>
                </h5>
                <p className="text-lg sm:text-lg">{experience.descr}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex w-full justify-center">
          <a
            href="curriculoMichel2025-04.pdf"
            className="my-8 w-60 border-4 border-black p-4 text-center"
          >
            Baixar meu currículo
          </a>
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
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.map((skill, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-white sm:text-2xl">
                    {skill.tech}
                  </h3>
                  <h3 className="text-lg font-bold text-white sm:text-2xl">
                    {skill.percentage}%
                  </h3>
                </div>
                <ProgressBar percentage={skill.percentage} />
              </div>
            ))}
          </div>
        </div>
      </Session>
      {/* <Session className="flex bg-white" textColor="black">
        <SessionHeading subtitle="meus" title="Projetos pessoais" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 bg-gray-400 p-4 sm:p-6 lg:p-8"
            >
              <h3 className="text-lg font-bold sm:text-2xl">{project.name}</h3>
              <h5>{project.stack}</h5>
              <p>{project.descr}</p>
            </div>
          ))}
        </div>
      </Session> */}

      <div className="flex-col place-content-between bg-black py-4 font-poppins">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="m-4 flex justify-between">
            <div className="font-poppins font-bold uppercase text-white"></div>
            <div className="font-poppins font-bold uppercase text-white">
              Feito por{' '}
              <a
                href="https://www.linkedin.com/in/michelvvs/"
                target="_blank"
                rel="noreferrer"
                className="text-green-400 underline"
              >
                Michel Victor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
