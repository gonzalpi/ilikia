using UnityEngine;
using UnityEngine.TestTools;
using NUnit.Framework;
using System.Collections;
using UnityEngine.SceneManagement;

public class TestSuite
{
    private GameObject game;

    [UnityTest]
    public IEnumerator ChangedScene(){
        
        SceneManager.LoadScene("MainScreen", LoadSceneMode.Additive);
        var activeScene = SceneManager.GetActiveScene();
        yield return new WaitForSeconds(5.0f);
        activeScene = SceneManager.GetActiveScene();
        Assert.AreEqual("PentagonDrawingScene",activeScene.name);
        
    }

}