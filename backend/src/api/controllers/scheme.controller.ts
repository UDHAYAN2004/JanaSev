import { Response } from "express";
import { Scheme } from "../../models/schemes";
import { AuthRequest } from "../middlewares/verifyToken";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { stat } from "fs";
import { raw } from "body-parser";

// ---------------- Create Scheme ----------------
export const createScheme = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, category, eligibility, community, documents,benefits,Apply, state } = req.body;

    // You can verify if the logged-in user is admin
    // if (req.user?.role !== "admin") {
    //   return res.status(403).json({ success: false, message: "Access denied" });
    // }

    const newScheme = await Scheme.create({
      title,
      description,
      category,
      eligibility,
      community,
      documents,
      benefits,
      Apply,
      state,
    });

    return res.status(201).json({
      success: true,
      message: "Scheme created successfully",
      data: newScheme,
    });
  } catch (error: any) {
    console.error("Error creating scheme:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create scheme",
      error: error.message,
    });
  }
};

// ---------------- Update Scheme ----------------
export const updateScheme = async (req: AuthRequest, res: Response) => {
  try {
    const schemeId = req.params.id;
    const scheme = await Scheme.findByPk(schemeId);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    const fieldsToUpdate: any = {};
    ["title", "description", "category", "eligibility", "community", "documents", "state"].forEach((field) => {
      if (req.body[field] !== undefined) fieldsToUpdate[field] = req.body[field];
    });

    await scheme.update(fieldsToUpdate);

    return res.status(200).json({
      success: true,
      message: "Scheme updated successfully",
      data: scheme,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to update scheme",
      error: error.message,
    });
  }
};

// ---------------- Delete Scheme ----------------
export const deleteScheme = async (req: AuthRequest, res: Response) => {
  try {
    const schemeId = req.params.id;

    if (!schemeId || typeof schemeId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid scheme ID format",
      });
    }

    const scheme = await Scheme.findByPk(schemeId);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    await scheme.destroy();

    return res.status(200).json({
      success: true,
      message: "Scheme deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete scheme",
      error: error.message,
    });
  }
};

export const getSchemeById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Find the scheme by ID
    const scheme = await Scheme.findByPk(id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: scheme,
    });
  } catch (error: any) {
    console.error("Error fetching scheme by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch scheme",
      error: error.message,
    });
  }
};

// get all schemes
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const schemes = await Scheme.findAll();

    if (schemes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No schemes found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Schemes fetched successfully",
      data: schemes,
    });
  } catch (error: any) {
    console.error("Error fetching schemes:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch schemes",
      error: error.message,
    });
  }
};

//fetching by category

export const getByCategory = async (req: AuthRequest, res: Response) => {
  try {
    // Cast req.params for TypeScript
    const { category } = req.params as { category: string };

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Fetch schemes from database where category matches
    const schemes = await Scheme.findAll({
      where: { category },
    });

    return res.status(200).json({
      success: true,
      data: schemes,
    });
  } catch (error: any) {
    console.error("Error fetching schemes by category:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getCategoryCount =async(req:AuthRequest, res:Response)=>{
  try{
    const categoryCounts=await Scheme.findAll({
      attributes:['category',
      [Sequelize.fn('COUNT',Sequelize.col("category")),"count"]],
      group:['category'],
      raw:true
    })
    if(categoryCounts.length===0)
    {
      return res.status(200).json({
        success:false,
        message:"No schemes found",
        data:categoryCounts
      })
    }
    return res.status(200).json({
      success:true,
      data:categoryCounts,
    })
  }
  catch(error:any){
    return res.status(500).json({
      success:false,
      message:"Cannot fetch the data",
      error:error.message 
    })
  }
}
//getting scheme by dynamic query using state,categroy and community

export const getSchemesByFilter = async (req: AuthRequest, res: Response) => {
  try {
    const { state, category, community } = req.query;
    const { limit, offset, page } = req.pagination!;

    const whereClause: any = {};

    if (state) {
      whereClause.state = { [Op.iLike]: `%${state}%` };
    }

    if (category) {
      whereClause.category = { [Op.iLike]: `%${category}%` };
    }

    if (community) {
      const communityList = (community as string)
        .split(",")
        .map((item) => item.trim().toUpperCase());

      whereClause.community = { [Op.overlap]: communityList };
    }

    // fetch with pagination
    const { rows, count } = await Scheme.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    return res.status(200).json({
      success: true,
      message: "Schemes fetched successfully",
      currentPage: page,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      pageSize: limit,
      data: rows,
    });
  } catch (error: any) {
    console.error("Error fetching schemes:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching schemes",
      error: error.message,
    });
  }
};

//========================= Fetch State===============================
export const getState = async (req: AuthRequest, res: Response) => {
  try {
    const states = await Scheme.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("state")), "state"]
      ],
      order: [["state", "ASC"]],
      raw: true,
    });
    if( states.length === 0){
      return res.status(200).json({
        success: false, })
    }
    // Extract only state names as an array
    const stateList = states.map((item) => item.state);
    console.log(stateList),
    console.log(states);
    
    return res.status(200).json({
      success: true,
      data: stateList, // will be ["Tamil Nadu"] if only one state
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch states",
      error: (error as Error).message,
    });
  }
};
//========================get categories===============================
export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await Scheme.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
      ],
      order: [["category", "ASC"]],
      raw: true,
    });

    // Convert array of objects -> array of category strings
    const categoryArray = categories.map((c) => c.category);

    if (categoryArray.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No categories found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: categoryArray,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch categories",
      error: (error as Error).message,
    });
  }
};
//====================Scheme Count===================================================
export const schemesCount= async(req:AuthRequest,res:Response)=>{
  try {
    const adminState=req.user?.state
    if(!adminState){
      return res.status(400).json({
        success:false,
        message: "Admin State is not fount in token"
      })
    }
    const schemesCount = await Scheme.count({
      where:{
        state:{
          [Op.iLike]:adminState
        }
      }
    })
    if(schemesCount === 0){
      return res.status(200).json({
        success:true,
        schemes:schemesCount,
        message:"There is no Scheme from this State"
      })
    }
    return res.status(200)
    .json({
      success:true,
      schemes:schemesCount
    })
    
   
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: (error as Error).message,
    });
  }
}
//=========================== fetch community==================================
export const fetchCommunity = async (req: AuthRequest, res: Response) => {
  try {
    const communityRecords = await Scheme.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("community")), "community"]
      ],
      order: [["community", "ASC"]],
      raw: true,
    });

    const communityArray = communityRecords.map((item) => item.community).filter(Boolean);

    // Flatten if nested (like [["BC","MBC","SC","ST"]])
    const flatCommunityArray = communityArray.flat();

    if (flatCommunityArray.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Community Found",
        data: [],
      });
    }

    // Remove duplicates + sort alphabetically
    const uniqueCommunities = [...new Set(flatCommunityArray)].sort();

    return res.status(200).json({
      success: true,
      data: uniqueCommunities,
    });

  } catch (error: any) {
    console.error("Error fetching communities:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};
