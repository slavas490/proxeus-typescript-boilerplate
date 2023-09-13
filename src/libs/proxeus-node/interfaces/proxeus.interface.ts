export interface IExternalNodeConfig {
  ID: string;
  Name: string;
  Detail: string;
  Url: string;
  Secret: string;
}

// 	ExternalNodeInstance struct {
// 		ID       string      `json:"id" storm:"id"`
// 		NodeName string      `json:"nodeName"`
// 		Config   interface{} `json:"nodeConfig"`
// 	}

// 	ExternalQuery struct {
// 		*ExternalNode
// 		*ExternalNodeInstance
// 	}
// )
