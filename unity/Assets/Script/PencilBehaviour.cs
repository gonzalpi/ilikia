using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PencilBehaviour : MonoBehaviour
{

    public float rotationSpeed=20f;
    [SerializeField] public Camera cam;

    // Update is called once per frame
    void Update()
    {
         transform.Rotate(10*Time.deltaTime,10*Time.deltaTime,0); //This constantly rotates de object around
        foreach(Touch touch in Input.touches){
            Ray camRay= cam.ScreenPointToRay(touch.position);
            RaycastHit raycastHit;
            if(Physics.Raycast (camRay, out raycastHit, maxDistance: 10)){
                if(touch.phase==TouchPhase.Began){
                    Debug.Log(message: "Touch input began at: "+ touch.position);
                }
                else if(touch.phase==TouchPhase.Moved){
                    transform.Rotate(xAngle: touch.deltaPosition.y*10f, yAngle: -touch.deltaPosition.x*10f, zAngle: 0, relativeTo: Space.World);
                }
            }
        }
        // if(Input.GetMouseButton(0)){
        //    transform.Rotate(new Vector3(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"),Input.GetAxis("Mouse Z"))*Time.deltaTime*rotationSpeed);
        // }
    }

    void OnMouseDrag(){
        float rotX= Input.GetAxis("Mouse X")*rotationSpeed;
        float rotY= Input.GetAxis("Mouse Y")*rotationSpeed;
        Vector3 right= Vector3.Cross(lhs: cam.transform.up, rhs: transform.position-cam.transform.position);
        Vector3 up=Vector3.Cross(lhs: transform.position-cam.transform.position,rhs: right);
        transform.rotation = Quaternion.AngleAxis(-rotX,up)*transform.rotation;
        transform.rotation = Quaternion.AngleAxis(rotY,right)*transform.rotation;        
    }
}
