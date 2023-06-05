import { useEffect, useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { DxfParser, parseString } from 'dxf-parser';

import { BufferGeometry, LineBasicMaterial, Scene, WebGLRenderer, ArcCurve } from "three";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

const DxfViewer = () => {
  const groupRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('models/floorplan.dxf')
      .then((response) => response.text())
      .then((textData) => {
        const parser = new DxfParser();
        const parseData = parser.parseSync(textData);
        setData(parseData);
      })
  }, []);

  if (!data) {
    return null;
  }

  console.log(data);

  const scene = new Scene();
  const materialBlue = new LineBasicMaterial({ color: 0x0000ff });
  const materialGreen = new LineBasicMaterial({ color: 0x00ff00 });
  const renderer = new WebGLRenderer();

  const LineMesh = ({ entity }) => {
    const points = entity.vertices;
    const geometry = new BufferGeometry().setFromPoints(points);
    return (
      <line geometry={geometry} material={materialBlue} />
    )
  };

  const PolylineMesh = ({ entity }) => {
    const points = entity.vertices;
    const geometry = new BufferGeometry().setFromPoints(points);
    return (
      <line geometry={geometry} material={materialGreen} />
    )
  }

  const ArcMesh = ({ entity }) => {
    const curve = new ArcCurve(entity.center.x, entity.center.y, entity.radius, entity.startAngle, entity.endAngle);
    const points = curve.getPoints(32);
    const arcGeometry = new BufferGeometry().setFromPoints(points);
    return (
      <line geometry={arcGeometry} material={materialBlue} />
    )

  }
  const CircleMesh = ({ entity }) => {
    const curve = new ArcCurve(entity.center.x, entity.center.y, entity.radius);
    const points = curve.getPoints(32);
    const arcGeometry = new BufferGeometry().setFromPoints(points);
    return (
      <line geometry={arcGeometry} material={materialBlue} />
    )
  }

  const EllipseMesh = ({ entity }) => {
    console.log(entity);
  }
  const PointMesh = ({ entity }) => {
    console.log(entity);
  }
  const SplineMesh = ({ entity }) => {
    console.log(entity);
  }
  const InsertMesh = ({ entity }) => {
    // console.log(entity);
  }
  const TextMesh = ({ entity }) => {
    console.log(entity);
    // const fontLoader = new FontLoader();
    // fontLoader.load('font.ttf')
    const textGeometry = new TextGeometry(entity.text, {
      size: 80,
      height: entity.textHeight,
      curveSegment: 12,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    });
    return (
      <mesh geometry={textGeometry} material={materialBlue}/>
    )
  }
  const MtextMesh = ({ entity }) => {
  }
  const FaceMesh = ({ entity }) => {
  }
  const SolidMesh = ({ entity }) => {
  }
  const DimensionMesh = ({ entity }) => {
  }
  const AttribMesh = ({ entity }) => {
  }
  const HatchMesh = ({ entity }) => {
  }



  return (
    <group ref={groupRef}>
      {data.entities.map((entity, index) => {
        switch (entity.type) {
          case "LINE": return <LineMesh key={index} entity={entity} />
          case "POLYLINE": return <PolylineMesh key={index} entity={entity} />
          case "LWPOLYLINE": return <PolylineMesh key={index} entity={entity} />
          case "ARC": return <ArcMesh key={index} entity={entity} />
          case "CIRCLE": return <CircleMesh key={index} entity={entity} />;
          case "ELLIPSE": return <EllipseMesh key={index} entity={entity} />;
          case "POINT": return <PointMesh key={index} entity={entity} />;
          case "SPLINE": return <SplineMesh key={index} entity={entity} />;
          case "INSERT": return <InsertMesh key={index} entity={entity} />;
          /* Works with rendering batches without intermediate entities. */
          case "TEXT": return <TextMesh key={index} entity={entity} />;
          case "MTEXT": return <MtextMesh key={index} entity={entity} />;
          case "3DFACE": return <FaceMesh key={index} entity={entity} />;
          case "SOLID": return <SolidMesh key={index} entity={entity} />;
          case "DIMENSION": return <DimensionMesh key={index} entity={entity} />;
          case "ATTRIB": return <AttribMesh key={index} entity={entity} />;
          case "HATCH": return <HatchMesh key={index} entity={entity} />;
          default:
            return;
        }
      })}
    </group>
  )
}

export default DxfViewer;